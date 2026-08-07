import { useState } from 'react'
import { getRandomPatient } from './fixtures'
import './PrototypeTab.css'

const FEATURES = [
  { key: 'age',              label: 'Age',               unit: 'years' },
  { key: 'healthScore',      label: 'Health Score',      unit: '1–10'  },
  { key: 'priorTransplants', label: 'Prior Transplants', unit: 'count' },
  { key: 'yearsWaiting',     label: 'Years Waiting',     unit: 'years' },
  { key: 'dependents',       label: 'Dependents',        unit: 'count' },
  { key: 'urgencyScore',     label: 'Urgency Score',     unit: '1–10'  },
]

const EMPTY = Object.fromEntries(FEATURES.map(f => [f.key, '']))

function mockModel() {
  return Math.random() > 0.5 ? 'Selected' : 'Rejected'
}

export default function Tab1() {
  const [patient, setPatient] = useState(EMPTY)
  const [result, setResult]   = useState(null)

  const generate = () => {
    const p = getRandomPatient()
    setPatient(Object.fromEntries(FEATURES.map(f => [f.key, String(p[f.key])])))
    setResult(null)
  }

  const checkResult = () => setResult(mockModel())

  const allFilled = FEATURES.every(f => patient[f.key] !== '')

  return (
    <div className="ka-layout">
      <div className="ka-col">
        <button className="ka-btn" onClick={generate}>Generate Patient</button>

        <table className="ka-table">
          <tbody>
            {FEATURES.map(({ key, label }) => (
              <tr key={key}>
                <td className="ka-table-label">{label}</td>
                <td className="ka-table-input">
                  <input
                    className="ka-input"
                    type="number"
                    value={patient[key]}
                    onChange={e => {
                      setPatient(p => ({ ...p, [key]: e.target.value }))
                      setResult(null)
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="ka-btn" disabled={!allFilled} onClick={checkResult}>
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
