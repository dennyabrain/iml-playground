import { useState } from 'react'
import { getRandomPatient } from '../../lib/patient/fixtures'
import './PrototypeTab.css'

const FIELDS = [
  { key: 'age',                       label: 'Age',                           format: v => `${v} yrs` },
  { key: 'causeOfDeath',              label: 'Cause of death',                format: v => v },
  { key: 'hba1c',                     label: 'HbA1c',                         format: v => `${v}%` },
  { key: 'hypertension',              label: 'Hypertension',                  format: v => v ? 'Yes' : 'No' },
  { key: 'donorRecipientWeightRatio', label: 'Donor / recipient weight ratio', format: v => v.toFixed(2) },
]

const randomPrediction = () => Math.random() > 0.5 ? 'Approved' : 'Rejected'

const emptyForm = { verdict: null, reason: '' }

export default function PrototypeTab() {
  const [patient,    setPatient]    = useState(getRandomPatient)
  const [prediction, setPrediction] = useState(randomPrediction)
  const [form,       setForm]       = useState(emptyForm)

  const next = () => {
    setPatient(getRandomPatient())
    setPrediction(randomPrediction())
  }

  const handleSubmit = () => {
    next()
    setForm(emptyForm)
  }

  return (
    <div className="udc-layout">
      <div className="udc-col">

        <button className="udc-btn" onClick={next}>See New Patient</button>

        <section className="udc-section">
          <span className="udc-section-label">Patient Data</span>
          <dl className="udc-fields">
            {FIELDS.map(({ key, label, format }) => (
              <div key={key} className="udc-field">
                <dt>{label}</dt>
                <dd>{format(patient[key])}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="udc-section">
          <span className="udc-section-label">Model Prediction</span>
          <p className={`udc-prediction udc-prediction--${prediction.toLowerCase()}`}>
            {prediction}
          </p>
        </section>

      </div>

      <div className="udc-col">
        <section className="udc-section">
          <span className="udc-section-label">Your Assessment</span>

          <div className="udc-verdict">
            <button
              className={`udc-btn${form.verdict === 'agree' ? ' udc-btn--active' : ''}`}
              onClick={() => setForm(f => ({ ...f, verdict: 'agree' }))}
            >
              I agree
            </button>
            <button
              className={`udc-btn${form.verdict === 'disagree' ? ' udc-btn--active' : ''}`}
              onClick={() => setForm(f => ({ ...f, verdict: 'disagree' }))}
            >
              I disagree
            </button>
          </div>

          {form.verdict === 'disagree' && (
            <textarea
              className="udc-reason"
              placeholder="Why do you disagree?"
              value={form.reason}
              onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
            />
          )}

          {form.verdict && (
            <button className="udc-btn" onClick={handleSubmit}>Ok</button>
          )}

        </section>
      </div>

    </div>
  )
}
