import { useState } from 'react'
import { DEFAULT_WEIGHTS, predictWithWeights } from '../../lib/linear-model'
import { getRandomPatient } from '../../lib/patient/fixtures'
import './PrototypeTab.css'

const FEATURES = [
  { key: 'age',                       label: 'Age',                           format: v => `${v} yrs` },
  { key: 'causeOfDeath',              label: 'Cause of death',                format: v => v },
  { key: 'hba1c',                     label: 'HbA1c',                         format: v => `${v}%` },
  { key: 'hypertension',              label: 'Hypertension',                  format: v => v ? 'Yes' : 'No' },
  { key: 'donorRecipientWeightRatio', label: 'Donor / recipient weight ratio', format: v => v.toFixed(2) },
]

const MIN = -10
const MAX = 10
const emptyForm = { verdict: null, reason: '' }

export default function PrototypeTab() {
  const [sliderWeights,    setSliderWeights]    = useState(DEFAULT_WEIGHTS)
  const [committedWeights, setCommittedWeights] = useState(null)
  const [patient,          setPatient]          = useState(null)
  const [form,             setForm]             = useState(emptyForm)

  const setWeight = (key, value) =>
    setSliderWeights(prev => ({ ...prev, [key]: parseFloat(value) }))

  const useThisModel = () => {
    setCommittedWeights({ ...sliderWeights })
    setPatient(getRandomPatient())
    setForm(emptyForm)
  }

  const handleSubmit = () => {
    setPatient(getRandomPatient())
    setForm(emptyForm)
  }

  const result = committedWeights && patient
    ? predictWithWeights(patient, committedWeights)
    : null

  return (
    <div className="dal-layout">

      <div className="dal-col">
        <section className="dal-section">
          <span className="dal-section-label">Model Weights</span>
          <div className="dal-sliders">
            {FEATURES.map(({ key, label }) => {
              const val  = sliderWeights[key]
              const fill = ((val - MIN) / (MAX - MIN)) * 100
              return (
                <div key={key} className="dal-weight-row">
                  <span className="dal-weight-label">{label}</span>
                  <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    step={0.01}
                    value={val}
                    onChange={e => setWeight(key, e.target.value)}
                    className="dal-slider"
                    style={{ '--fill': `${fill}%` }}
                  />
                  <span className="dal-weight-value">{val >= 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}</span>
                </div>
              )
            })}
          </div>
          <button className="dal-commit-btn" onClick={useThisModel}>
            Use this Model
          </button>
        </section>
      </div>

      {result ? (
        <div className="dal-col">
          <section className="dal-section">
            <span className="dal-section-label">Patient Data</span>
            <dl className="dal-fields">
              {FEATURES.map(({ key, label, format }) => (
                <div key={key} className="dal-field">
                  <dt>{label}</dt>
                  <dd>{format(patient[key])}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="dal-section">
            <span className="dal-section-label">Model Prediction</span>
            <p className={`dal-prediction dal-prediction--${result.prediction ? 'true' : 'false'}`}>
              {result.prediction ? 'True' : 'False'}
            </p>
            <p className="dal-probability">{(result.probability * 100).toFixed(1)}% probability</p>
          </section>

          <section className="dal-section">
            <span className="dal-section-label">Your Assessment</span>
            <div className="dal-verdict">
              <button
                className={`dal-btn${form.verdict === 'agree' ? ' dal-btn--active' : ''}`}
                onClick={() => setForm(f => ({ ...f, verdict: 'agree' }))}
              >
                I agree
              </button>
              <button
                className={`dal-btn${form.verdict === 'disagree' ? ' dal-btn--active' : ''}`}
                onClick={() => setForm(f => ({ ...f, verdict: 'disagree' }))}
              >
                I disagree
              </button>
            </div>

            {form.verdict === 'disagree' && (
              <textarea
                className="dal-reason"
                placeholder="Why do you disagree?"
                value={form.reason}
                onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
              />
            )}

            {form.verdict && (
              <button className="dal-btn" onClick={handleSubmit}>Ok</button>
            )}
          </section>
        </div>
      ) : (
        <div className="dal-col dal-col--empty">
          <p className="dal-empty-hint">Set your weights and click <strong>Use this Model</strong> to begin.</p>
        </div>
      )}

    </div>
  )
}
