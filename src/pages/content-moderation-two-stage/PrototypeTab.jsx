import { useState } from 'react'
import { getRandomSentence } from './fixtures'
import '../two-stage-model/PrototypeTab.css'

const PARAMETERS = [
  {
    key: 'severity',
    label: 'Severity',
    question: 'How severe is the language in this sentence?',
    options: ['low', 'medium', 'high'],
  },
  {
    key: 'targetedIdentity',
    label: 'Targeted identity',
    question: 'Which identity group (if any) is targeted?',
    options: ['race', 'religion', 'gender', 'caste', 'class', 'none'],
  },
  {
    key: 'appropriated',
    label: 'Appropriated',
    question: 'Is this language used by the in-group (appropriated)?',
    options: ['yes', 'no'],
  },
]

function computeVerdict(choices) {
  const severityScore = { low: 1, medium: 2, high: 3 }[choices.severity] ?? 0
  const identityScore = choices.targetedIdentity && choices.targetedIdentity !== 'none' ? 1 : 0
  const appropriatedScore = choices.appropriated === 'no' ? 1 : 0
  const total = severityScore + identityScore + appropriatedScore

  if (total >= 4) return { label: 'Remove', color: '#c0392b' }
  if (total === 3) return { label: 'Flag for review', color: '#e67e22' }
  return { label: 'Approve', color: '#27ae60' }
}

export default function ContentModerationPrototypeTab() {
  const [sentence, setSentence] = useState(null)
  const [step, setStep]         = useState(0)
  const [choices, setChoices]   = useState({})
  const [verdict, setVerdict]   = useState(null)
  const [feedback, setFeedback] = useState('')

  const start = () => {
    setSentence(getRandomSentence())
    setStep(0)
    setChoices({})
    setVerdict(null)
    setFeedback('')
  }

  const choose = (option) => {
    const next = { ...choices, [PARAMETERS[step].key]: option }
    setChoices(next)
    if (step < PARAMETERS.length - 1) setStep(step + 1)
  }

  const param   = PARAMETERS[step]
  const allDone = Object.keys(choices).length === PARAMETERS.length
  const result  = allDone ? computeVerdict(choices) : null

  return (
    <div className="tsm-container">

      <button className="tsm-btn tsm-generate" onClick={start}>
        Generate sentence
      </button>

      {sentence && (
        <>
          <div style={{ padding: '16px 20px', border: '1px solid #d0d0d0', maxWidth: '540px' }}>
            <span style={{ fontSize: 11, color: '#b0b0b0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Sentence
            </span>
            <p style={{ marginTop: 8, fontSize: 15, color: '#1a1a1a', lineHeight: 1.5 }}>
              {sentence.text}
            </p>
          </div>

          {/* ── Stage 1 ── */}
          <section className="tsm-stage">
            <span className="tsm-stage-label">Stage 1 — Parameter evaluation</span>

            <div className="tsm-progress">
              {PARAMETERS.map((p, i) => (
                <div
                  key={p.key}
                  className={[
                    'tsm-pip',
                    i === step          ? 'tsm-pip--active' : '',
                    choices[p.key]      ? 'tsm-pip--done'   : '',
                  ].join(' ')}
                />
              ))}
            </div>

            {!allDone && (
              <div className="tsm-comparison">
                <span className="tsm-param-label">{param.question}</span>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {param.options.map(opt => (
                    <button
                      key={opt}
                      className={`tsm-card ${choices[param.key] === opt ? 'tsm-card--chosen' : ''}`}
                      style={{ width: 'auto', height: 'auto', padding: '10px 20px' }}
                      onClick={() => choose(opt)}
                    >
                      <span className="tsm-card-value" style={{ fontSize: 13, textTransform: 'capitalize' }}>
                        {opt}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="tsm-step-nav">
                  <button
                    className="tsm-nav-btn"
                    disabled={step === 0}
                    onClick={() => setStep(s => s - 1)}
                  >
                    ← Back
                  </button>
                  <span className="tsm-step-count">{step + 1} / {PARAMETERS.length}</span>
                </div>
              </div>
            )}

            {allDone && (
              <div className="tsm-summary">
                {PARAMETERS.map(p => (
                  <div key={p.key} className="tsm-summary-row">
                    <span className="tsm-summary-param">{p.label}</span>
                    <span className="tsm-summary-choice" style={{ textTransform: 'capitalize' }}>
                      {choices[p.key]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Stage 2 ── */}
          {allDone && result && (
            <section className="tsm-stage">
              <span className="tsm-stage-label">Stage 2 — Simple tallying rule</span>

              <p className="tsm-tally-result">
                Based on your evaluation, the recommended action is{' '}
                <strong style={{ color: result.color }}>{result.label}</strong>.
              </p>

              {verdict === null && (
                <div className="tsm-verdict-btns">
                  <button className="tsm-btn" onClick={() => { setVerdict('agree'); start() }}>
                    I agree
                  </button>
                  <button className="tsm-btn" onClick={() => setVerdict('disagree')}>
                    I disagree
                  </button>
                </div>
              )}

              {verdict === 'disagree' && (
                <div className="tsm-feedback">
                  <textarea
                    className="tsm-textarea"
                    placeholder="Why do you disagree with this verdict?"
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                  />
                  <button
                    className="tsm-btn"
                    disabled={!feedback.trim()}
                    onClick={start}
                  >
                    Submit
                  </button>
                </div>
              )}
            </section>
          )}
        </>
      )}

    </div>
  )
}
