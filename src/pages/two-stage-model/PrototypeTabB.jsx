import { useState } from 'react'
import { getRandomPatient } from '../../lib/patient/fixtures'
import './PrototypeTab.css'

const PARAMETERS = [
  { key: 'age',                       label: 'Age',                           format: v => `${v} yrs` },
  { key: 'causeOfDeath',              label: 'Cause of death',                format: v => v },
  { key: 'hba1c',                     label: 'HbA1c',                         format: v => `${v}%` },
  { key: 'hypertension',              label: 'Hypertension',                  format: v => v ? 'Yes' : 'No' },
  { key: 'donorRecipientWeightRatio', label: 'Donor / recipient weight ratio', format: v => v.toFixed(2) },
]

function generateScenario() {
  return { patientA: getRandomPatient(), patientB: getRandomPatient() }
}

export default function PrototypeTabB() {
  const [scenario, setScenario] = useState(null)
  const [choices, setChoices]   = useState(Array(5).fill(null))
  const [verdict, setVerdict]   = useState(null)
  const [feedback, setFeedback] = useState('')

  const start = () => {
    setScenario(generateScenario())
    setChoices(Array(5).fill(null))
    setVerdict(null)
    setFeedback('')
  }

  const choose = (paramIndex, patient) => {
    setChoices(prev => {
      const next = [...prev]
      next[paramIndex] = patient
      return next
    })
  }

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

            <div className="tsm-grid">
              <div className="tsm-grid-header" />
              <div className="tsm-grid-header tsm-grid-patient">Patient A</div>
              <div className="tsm-grid-header tsm-grid-patient">Patient B</div>

              {PARAMETERS.map((p, i) => {
                const chosen = choices[i]
                return (
                  <>
                    <div key={`${p.key}-label`} className="tsm-grid-label">{p.label}</div>
                    {['A', 'B'].map(side => (
                      <button
                        key={`${p.key}-${side}`}
                        className={[
                          'tsm-grid-cell',
                          chosen === side   ? 'tsm-grid-cell--chosen'   : '',
                          chosen && chosen !== side ? 'tsm-grid-cell--unchosen' : '',
                        ].join(' ')}
                        onClick={() => choose(i, side)}
                      >
                        {p.format(scenario[side === 'A' ? 'patientA' : 'patientB'][p.key])}
                      </button>
                    ))}
                  </>
                )
              })}
            </div>
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
