import { useState } from 'react'
import { DEFAULT_WEIGHTS, predict, predictWithWeights } from '../../lib/linear-model'
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
const emptyForm = { verdict: null, weights: DEFAULT_WEIGHTS }

export default function PrototypeTab() {
  const [patient, setPatient] = useState(getRandomPatient)
  const [form,    setForm]    = useState(emptyForm)

  const defaultResult = predict(patient)
  const customResult  = predictWithWeights(patient, form.weights)

  const setVerdict = verdict => setForm(f => ({ ...f, verdict }))
  const setWeight  = (key, value) =>
    setForm(f => ({ ...f, weights: { ...f.weights, [key]: parseFloat(value) } }))

  const handleSubmit = () => {
    setPatient(getRandomPatient())
    setForm(emptyForm)
  }

  return (
    <div className="tw-layout">

      <div className="tw-col">
        <section className="tw-section">
          <span className="tw-section-label">Patient Data</span>
          <dl className="tw-fields">
            {FEATURES.map(({ key, label, format }) => (
              <div key={key} className="tw-field">
                <dt>{label}</dt>
                <dd>{format(patient[key])}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="tw-section">
          <span className="tw-section-label">Model Prediction</span>
          <p className={`tw-prediction tw-prediction--${defaultResult.prediction ? 'true' : 'false'}`}>
            {defaultResult.prediction ? 'True' : 'False'}
          </p>
          <p className="tw-probability">{(defaultResult.probability * 100).toFixed(1)}% probability</p>
        </section>
      </div>

      <div className="tw-col">
        <section className="tw-section">
          <span className="tw-section-label">Your Assessment</span>

          <div className="tw-verdict">
            <button
              className={`tw-btn${form.verdict === 'agree' ? ' tw-btn--active' : ''}`}
              onClick={() => setVerdict('agree')}
            >
              I agree
            </button>
            <button
              className={`tw-btn${form.verdict === 'disagree' ? ' tw-btn--active' : ''}`}
              onClick={() => setVerdict('disagree')}
            >
              I disagree
            </button>
          </div>

          {form.verdict === 'disagree' && (
            <>
              <div className="weights-panel">
                {FEATURES.map(({ key, label }) => {
                  const val  = form.weights[key]
                  const fill = ((val - MIN) / (MAX - MIN)) * 100
                  return (
                    <div key={key} className="weight-row">
                      <span className="weight-label">{label}</span>
                      <input
                        type="range"
                        min={MIN}
                        max={MAX}
                        step={0.01}
                        value={val}
                        onChange={e => setWeight(key, e.target.value)}
                        className="weight-slider"
                        style={{ '--fill': `${fill}%` }}
                      />
                      <span className="weight-value">{val >= 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}</span>
                    </div>
                  )
                })}
              </div>

              <div className="tw-custom-result">
                <span className="tw-section-label">New Prediction</span>
                <p className={`tw-prediction tw-prediction--${customResult.prediction ? 'true' : 'false'}`}>
                  {customResult.prediction ? 'True' : 'False'}
                </p>
                <p className="tw-probability">{(customResult.probability * 100).toFixed(1)}% probability</p>
              </div>
            </>
          )}

          {form.verdict && (
            <button className="tw-btn" onClick={handleSubmit}>Ok</button>
          )}
        </section>
      </div>

    </div>
  )
}
