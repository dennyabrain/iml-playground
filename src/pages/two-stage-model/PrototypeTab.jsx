import { useState } from 'react'
import { getRandomPatient } from '../../lib/patient/fixtures'
import './PrototypeTab.css'

const PARAMETERS = [
  { key: 'age',                       label: 'Age',                          format: v => `${v} yrs` },
  { key: 'causeOfDeath',              label: 'Cause of death',               format: v => v },
  { key: 'hba1c',                     label: 'HbA1c',                        format: v => `${v}%` },
  { key: 'hypertension',              label: 'Hypertension',                 format: v => v ? 'Yes' : 'No' },
  { key: 'donorRecipientWeightRatio', label: 'Donor / recipient weight ratio', format: v => v.toFixed(2) },
]

function generateScenario() {
  return { patientA: getRandomPatient(), patientB: getRandomPatient() }
}

export default function PrototypeTab() {
  const [scenario, setScenario]     = useState(null)
  const [step, setStep]             = useState(0)
  const [choices, setChoices]       = useState(Array(5).fill(null))
  const [verdict, setVerdict]       = useState(null)   // 'agree' | 'disagree'
  const [feedback, setFeedback]     = useState('')

  const start = () => {
    setScenario(generateScenario())
    setStep(0)
    setChoices(Array(5).fill(null))
    setVerdict(null)
    setFeedback('')
  }

  const choose = (patient) => {
    const next = [...choices]
    next[step] = patient
    setChoices(next)
    if (step < PARAMETERS.length - 1) setStep(step + 1)
  }

  const param   = PARAMETERS[step]
  const allDone = choices.every(Boolean)

  const winner = allDone
    ? choices.filter(c => c === 'A').length >= choices.filter(c => c === 'B').length ? 'A' : 'B'
    : null

  return (
    <div className="tsm-container">

      <button className="tsm-btn tsm-generate" onClick={start}>
        Generate scenario
      </button>

      {scenario && (
        <>
          {/* ── Stage 1 ── */}
          <section className="tsm-stage">
            <span className="tsm-stage-label">Stage 1 — Parameter comparison</span>

            <div className="tsm-progress">
              {PARAMETERS.map((p, i) => (
                <div
                  key={p.key}
                  className={[
                    'tsm-pip',
                    i === step        ? 'tsm-pip--active'  : '',
                    choices[i]        ? 'tsm-pip--done'    : '',
                  ].join(' ')}
                />
              ))}
            </div>

            {!allDone && (
              <div className="tsm-comparison">
                <span className="tsm-param-label">{param.label}</span>

                <div className="tsm-cards">
                  <button
                    className={`tsm-card ${choices[step] === 'A' ? 'tsm-card--chosen' : ''}`}
                    onClick={() => choose('A')}
                  >
                    <span className="tsm-card-tag">Patient A</span>
                    <span className="tsm-card-value">
                      {param.format(scenario.patientA[param.key])}
                    </span>
                  </button>

                  <button
                    className={`tsm-card ${choices[step] === 'B' ? 'tsm-card--chosen' : ''}`}
                    onClick={() => choose('B')}
                  >
                    <span className="tsm-card-tag">Patient B</span>
                    <span className="tsm-card-value">
                      {param.format(scenario.patientB[param.key])}
                    </span>
                  </button>
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
                {PARAMETERS.map((p, i) => (
                  <div key={p.key} className="tsm-summary-row">
                    <span className="tsm-summary-param">{p.label}</span>
                    <span className="tsm-summary-choice">→ Patient {choices[i]}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Stage 2 ── */}
          {allDone && (
            <section className="tsm-stage">
              <span className="tsm-stage-label">Stage 2 — Simple Tallying Rule</span>

              <p className="tsm-tally-result">
                Patient <strong>{winner}</strong> was chosen more often and is selected as the better donor.
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
                    placeholder="Why do you disagree?"
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
