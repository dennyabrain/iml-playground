import { useState } from 'react'
import { getRandomSentence } from './fixtures'
import '../two-stage-model/PrototypeTab.css'

const PARAMETERS = [
  { key: 'severity', label: 'Severity', options: ['low', 'medium', 'high'] },
  { key: 'targetedIdentity', label: 'Targeted identity', options: ['race', 'religion', 'gender', 'caste', 'class', 'none'] },
  { key: 'appropriated', label: 'Appropriated', options: ['yes', 'no'] },
]

const SEVERITY_SCORE = { low: 1, medium: 2, high: 3 }

function computeScores(choices) {
  const s = SEVERITY_SCORE[choices.severity] ?? 0
  const i = choices.targetedIdentity && choices.targetedIdentity !== 'none' ? 1 : 0
  const a = choices.appropriated === 'no' ? 1 : 0
  return { s, i, a, total: s + i + a }
}

function computeVerdict(total) {
  if (total >= 4) return { label: 'Remove', color: '#c0392b' }
  if (total === 3) return { label: 'Flag for review', color: '#e67e22' }
  return { label: 'Approve', color: '#27ae60' }
}

const RANDOM_VERDICTS = [
  { label: 'Approve', color: '#27ae60' },
  { label: 'Remove',  color: '#c0392b' },
]

export default function ContentModerationPrototypeBTab() {
  const [sentence, setSentence]       = useState(null)
  const [prediction, setPrediction]   = useState(null)
  const [choices, setChoices]         = useState({})
  const [activeParam, setActiveParam] = useState(null)

  const start = () => {
    setSentence(getRandomSentence())
    setPrediction(RANDOM_VERDICTS[Math.random() < 0.5 ? 0 : 1])
    setChoices({})
    setActiveParam(null)
  }

  const choose = (key, value) => {
    setChoices(prev => ({ ...prev, [key]: value }))
    setActiveParam(null)
  }

  const toggleParam = (key) =>
    setActiveParam(prev => (prev === key ? null : key))

  const allDone = Object.keys(choices).length === PARAMETERS.length
  const scores  = allDone ? computeScores(choices) : null
  const verdict = allDone ? computeVerdict(scores.total) : null

  return (
    <div className="tsm-container">
      <button className="tsm-btn tsm-generate" onClick={start}>
        Generate sentence
      </button>

      {sentence && (
        <>
          {/* ── Top row: sentence + prediction ── */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'stretch', maxWidth: 700 }}>
            <div style={{ flex: 1, padding: '16px 20px', border: '1px solid #d0d0d0', borderRadius: 4 }}>
              <span style={{ fontSize: 11, color: '#b0b0b0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Sentence
              </span>
              <p style={{ marginTop: 8, marginBottom: 0, fontSize: 15, color: '#1a1a1a', lineHeight: 1.55 }}>
                {sentence.text}
              </p>
            </div>

            <div style={{
              width: 150, padding: '16px 12px', border: '1px solid #d0d0d0', borderRadius: 4,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 11, color: '#b0b0b0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Prediction
              </span>
              {prediction ? (
                <span style={{ fontSize: 15, fontWeight: 700, color: prediction.color, textAlign: 'center' }}>
                  {prediction.label}
                </span>
              ) : (
                <span style={{ fontSize: 22, color: '#d0d0d0' }}>—</span>
              )}
            </div>
          </div>

          {/* ── Stage 1: 3 feature boxes ── */}
          <section className="tsm-stage">
            <span className="tsm-stage-label">Stage 1 — Feature evaluation</span>

            <div style={{ display: 'flex', gap: 16, maxWidth: 700 }}>
              {PARAMETERS.map(param => {
                const isActive  = activeParam === param.key
                const hasValue  = !!choices[param.key]
                return (
                  <div key={param.key} style={{ flex: 1 }}>
                    <div
                      onClick={() => toggleParam(param.key)}
                      style={{
                        border: `2px solid ${isActive || hasValue ? '#2c7be5' : '#d0d0d0'}`,
                        borderRadius: isActive ? '6px 6px 0 0' : 6,
                        padding: '14px 14px',
                        minHeight: 90,
                        cursor: 'pointer',
                        background: hasValue ? '#f0f6ff' : isActive ? '#f5f9ff' : '#fafafa',
                        userSelect: 'none',
                      }}
                    >
                      <span style={{
                        fontSize: 10, color: hasValue ? '#2c7be5' : '#aaa',
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        display: 'block', marginBottom: 10,
                      }}>
                        {param.label}
                      </span>
                      {hasValue ? (
                        <span style={{ fontSize: 14, fontWeight: 600, textTransform: 'capitalize', color: '#1a1a1a' }}>
                          {choices[param.key]}
                        </span>
                      ) : (
                        <span style={{ fontSize: 12, color: '#c8c8c8' }}>click to fill</span>
                      )}
                    </div>

                    {isActive && (
                      <div style={{
                        border: '2px solid #2c7be5', borderTop: 'none',
                        borderRadius: '0 0 6px 6px', background: '#fff',
                        padding: 10, display: 'flex', flexWrap: 'wrap', gap: 6,
                      }}>
                        {param.options.map(opt => (
                          <button
                            key={opt}
                            onClick={(e) => { e.stopPropagation(); choose(param.key, opt) }}
                            style={{
                              padding: '5px 11px', fontSize: 12,
                              border: `1px solid ${choices[param.key] === opt ? '#2c7be5' : '#d0d0d0'}`,
                              borderRadius: 4, cursor: 'pointer',
                              background: choices[param.key] === opt ? '#2c7be5' : '#fff',
                              color: choices[param.key] === opt ? '#fff' : '#333',
                              textTransform: 'capitalize',
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── connector arrow ── */}
          <div style={{ textAlign: 'left', paddingLeft: 20, fontSize: 18, color: '#c0c0c0', marginTop: -24 }}>
            ↓
          </div>

          {/* ── Stage 2: aggregate function ── */}
          <section className="tsm-stage" style={{ marginTop: -16 }}>
            <span className="tsm-stage-label">Stage 2 — Aggregate function</span>

            <div style={{
              border: '2px dashed #d0d0d0', borderRadius: 6,
              padding: '18px 22px', maxWidth: 700,
              background: allDone ? '#fffdf2' : '#fafafa',
              fontFamily: '"SF Mono", "Fira Code", monospace',
            }}>
              <div style={{ fontSize: 13, color: '#555', marginBottom: 10 }}>
                score(x) = severity_score(x₁) + identity_score(x₂) + appropriated_score(x₃)
              </div>

              {allDone && (
                <div style={{ fontSize: 13, color: '#1a1a1a' }}>
                  {'= '}
                  <span style={{ color: '#2c7be5' }}>{scores.s}</span>
                  {' + '}
                  <span style={{ color: '#2c7be5' }}>{scores.i}</span>
                  {' + '}
                  <span style={{ color: '#2c7be5' }}>{scores.a}</span>
                  {'  →  '}
                  <strong style={{ color: verdict.color }}>score = {scores.total}</strong>
                </div>
              )}

              <div style={{
                marginTop: 14, paddingTop: 12,
                borderTop: '1px solid #e8e8e8',
                fontSize: 11, color: '#aaa', lineHeight: 1.7,
              }}>
                score ≥ 4 → <span style={{ color: '#c0392b' }}>Remove</span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                score = 3 → <span style={{ color: '#e67e22' }}>Flag for review</span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                score &lt; 3 → <span style={{ color: '#27ae60' }}>Approve</span>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
