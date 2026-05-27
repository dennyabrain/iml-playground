import { useState } from 'react'
import './PrototypeTab.css'

const WEIGHTS = [
  { key: 'age',                      label: 'Age' },
  { key: 'causeOfDeath',             label: 'Cause of death' },
  { key: 'hba1c',                    label: 'HbA1c' },
  { key: 'hypertension',             label: 'Hypertension' },
  { key: 'donorRecipientWeightRatio',label: 'Donor / recipient weight ratio' },
]

const MIN = -10
const MAX = 10
const INITIAL = Object.fromEntries(WEIGHTS.map(w => [w.key, 0]))

export default function PrototypeTab() {
  const [weights, setWeights] = useState(INITIAL)

  const set = (key, value) =>
    setWeights(prev => ({ ...prev, [key]: parseFloat(value) }))

  return (
    <div className="weights-panel">
      {WEIGHTS.map(({ key, label }) => {
        const val = weights[key]
        const fill = ((val - MIN) / (MAX - MIN)) * 100
        return (
          <div key={key} className="weight-row">
            <span className="weight-label">{label}</span>
            <input
              type="range"
              min={MIN}
              max={MAX}
              step={0.1}
              value={val}
              onChange={e => set(key, e.target.value)}
              className="weight-slider"
              style={{ '--fill': `${fill}%` }}
            />
            <span className="weight-value">{val >= 0 ? `+${val.toFixed(1)}` : val.toFixed(1)}</span>
          </div>
        )
      })}
    </div>
  )
}
