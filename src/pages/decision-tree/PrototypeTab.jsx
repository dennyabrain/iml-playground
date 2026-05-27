import { Fragment, useState } from 'react'
import './PrototypeTab.css'

const PARAMETERS = [
  { key: 'age',                       label: 'Age' },
  { key: 'causeOfDeath',              label: 'Cause of death' },
  { key: 'hba1c',                     label: 'HbA1c' },
  { key: 'hypertension',              label: 'Hypertension' },
  { key: 'donorRecipientWeightRatio', label: 'Donor / recipient weight ratio' },
]

const OPERATORS = ['<', '≤', '=', '≥', '>']

const emptySteps = () => Array(5).fill(null)

export default function PrototypeTab() {
  const [steps, setSteps]       = useState(emptySteps)
  const [dragging, setDragging] = useState(null)
  const [dragOver, setDragOver] = useState(null)

  const usedKeys = steps.filter(Boolean).map(s => s.key)

  const drop = (index) => {
    setDragOver(null)
    if (!dragging || steps[index]) return
    const param = PARAMETERS.find(p => p.key === dragging)
    setSteps(prev => {
      const next = [...prev]
      next[index] = { ...param, operator: '<', threshold: '' }
      return next
    })
    setDragging(null)
  }

  const update = (index, field, value) =>
    setSteps(prev => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })

  const clear = (index) =>
    setSteps(prev => {
      const next = [...prev]
      next[index] = null
      return next
    })

  return (
    <div className="dt-panel">

      <div className="dt-steps">
        {steps.map((step, i) => (
          <Fragment key={i}>
            <div className="dt-step-col">
              <span className="dt-step-num">{i + 1}</span>
              <div
                className={[
                  'dt-step',
                  step              ? 'dt-step--filled' : 'dt-step--empty',
                  dragOver === i    ? 'dt-step--over'   : '',
                ].join(' ')}
                onDragOver={e => { if (!step) { e.preventDefault(); setDragOver(i) } }}
                onDragLeave={() => setDragOver(null)}
                onDrop={() => drop(i)}
              >
                {step ? (
                  <>
                    <button className="dt-clear" onClick={() => clear(i)}>×</button>
                    <span className="dt-step-label">{step.label}</span>
                    <div className="dt-threshold">
                      <select
                        className="dt-operator"
                        value={step.operator}
                        onChange={e => update(i, 'operator', e.target.value)}
                      >
                        {OPERATORS.map(op => <option key={op} value={op}>{op}</option>)}
                      </select>
                      <input
                        className="dt-threshold-input"
                        type="number"
                        value={step.threshold}
                        placeholder="0"
                        onChange={e => update(i, 'threshold', e.target.value)}
                      />
                    </div>
                    <span className="dt-outcome">
                      <span className="dt-yes">yes →</span>
                      <span className="dt-no">no ↓</span>
                    </span>
                  </>
                ) : (
                  <span className="dt-hint">drop here</span>
                )}
              </div>
            </div>
            {i < 4 && <span className="dt-arrow">→</span>}
          </Fragment>
        ))}
      </div>

      <div className="dt-palette">
        <span className="dt-palette-heading">Parameters</span>
        <div className="dt-blocks">
          {PARAMETERS.map(p => {
            const used = usedKeys.includes(p.key)
            return (
              <div
                key={p.key}
                draggable={!used}
                onDragStart={() => setDragging(p.key)}
                onDragEnd={() => setDragging(null)}
                className={`dt-block${used ? ' dt-block--used' : ''}`}
              >
                {p.label}
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
