import { useState } from 'react'
import { getRandomPatient } from './fixtures'
import './PrototypeTab.css'

const FEATURES = [
  { key: 'age',              label: 'Age',               min: 0, max: 100, step: 1,   default: 45  },
  { key: 'healthScore',      label: 'Health Score',      min: 1, max: 10,  step: 1,   default: 5   },
  { key: 'priorTransplants', label: 'Prior Transplants', min: 0, max: 5,   step: 1,   default: 0   },
  { key: 'yearsWaiting',     label: 'Years Waiting',     min: 0, max: 20,  step: 1,   default: 5   },
  { key: 'dependents',       label: 'Dependents',        min: 0, max: 10,  step: 1,   default: 2   },
  { key: 'urgencyScore',     label: 'Urgency Score',     min: 1, max: 10,  step: 1,   default: 5   },
]

const DEFAULT_STATE = Object.fromEntries(FEATURES.map(f => [f.key, f.default]))

function mockModel() {
  return Math.random() > 0.5 ? 'Selected' : 'Rejected'
}

export default function Tab2() {
  const [patient, setPatient] = useState(DEFAULT_STATE)
  const [result, setResult]   = useState(null)

  const generate = () => {
    const p = getRandomPatient()
    setPatient(Object.fromEntries(FEATURES.map(f => [f.key, p[f.key]])))
    setResult(null)
  }

  const update = (key, value) => {
    setPatient(p => ({ ...p, [key]: Number(value) }))
    setResult(null)
  }

  return (
    <div className="ka-layout">
      <div className="ka-col">
        <button className="ka-btn" onClick={generate}>Generate Patient</button>

        <table className="ka-table">
          <tbody>
            {FEATURES.map(({ key, label, min, max, step }) => (
              <tr key={key}>
                <td className="ka-table-label">{label}</td>
                <td className="ka-table-input">
                  <div className="ka-slider-cell">
                    <span className="ka-slider-value">{patient[key]}</span>
                    <input
                      className="ka-slider"
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={patient[key]}
                      onChange={e => update(key, e.target.value)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="ka-btn" onClick={() => setResult(mockModel())}>
          Check Result
        </button>
      </div>

      <div className="ka-col">
        <span className="ka-col-label">Model Response</span>
        {result && (
          <span className={`ka-result ka-result--${result.toLowerCase()}`}>
            {result}
          </span>
        )}
      </div>
    </div>
  )
}
