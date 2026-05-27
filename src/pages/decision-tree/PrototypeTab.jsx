import { Fragment, useEffect, useState } from 'react'
import { CAUSES_OF_DEATH } from '../../lib/patient/schema'
import './PrototypeTab.css'

const OPERATORS = ['<', '≤', '=', '≥', '>']

const PARAMETERS = [
  {
    key: 'age',
    label: 'Age',
    type: 'numeric',
  },
  {
    key: 'causeOfDeath',
    label: 'Cause of death',
    type: 'multiselect',
    options: CAUSES_OF_DEATH,
  },
  {
    key: 'hba1c',
    label: 'HbA1c',
    type: 'numeric',
    min: 3,
    max: 8,
    increment: 0.1,
  },
  {
    key: 'hypertension',
    label: 'Hypertension',
    type: 'boolean',
  },
  {
    key: 'donorRecipientWeightRatio',
    label: 'Donor / recipient weight ratio',
    type: 'numeric',
    min: 0,
    max: 1,
    increment: 0.01,
  },
]

const initialThreshold = (param) => {
  if (param.type === 'multiselect') return { selected: [] }
  if (param.type === 'boolean')     return { value: 'true' }
  return { operator: '<', threshold: '' }
}

function ThresholdInput({ step, index, update, openDropdown, setOpenDropdown }) {
  if (step.type === 'numeric') {
    return (
      <div className="dt-threshold">
        <select
          className="dt-operator"
          value={step.operator}
          onChange={e => update(index, 'operator', e.target.value)}
        >
          {OPERATORS.map(op => <option key={op} value={op}>{op}</option>)}
        </select>
        <input
          className="dt-threshold-input"
          type="number"
          value={step.threshold}
          placeholder={step.min ?? '0'}
          min={step.min}
          max={step.max}
          step={step.increment}
          onChange={e => update(index, 'threshold', e.target.value)}
        />
      </div>
    )
  }

  if (step.type === 'boolean') {
    return (
      <div className="dt-threshold">
        <span className="dt-op-fixed">=</span>
        <select
          className="dt-operator dt-bool-select"
          value={step.value}
          onChange={e => update(index, 'value', e.target.value)}
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </div>
    )
  }

  if (step.type === 'multiselect') {
    const isOpen = openDropdown === index
    const count  = step.selected.length
    return (
      <div
        className="dt-multiselect"
        onMouseDown={e => e.stopPropagation()}
      >
        <button
          className="dt-multiselect-btn"
          onClick={() => setOpenDropdown(isOpen ? null : index)}
        >
          {count ? `${count} selected ▾` : 'select ▾'}
        </button>
        {isOpen && (
          <div className="dt-dropdown">
            {step.options.map(opt => (
              <label key={opt} className="dt-dropdown-item">
                <input
                  type="checkbox"
                  checked={step.selected.includes(opt)}
                  onChange={e => {
                    const next = e.target.checked
                      ? [...step.selected, opt]
                      : step.selected.filter(o => o !== opt)
                    update(index, 'selected', next)
                  }}
                />
                {opt}
              </label>
            ))}
          </div>
        )}
      </div>
    )
  }
}

const emptySteps = () => Array(5).fill(null)

export default function PrototypeTab() {
  const [steps, setSteps]           = useState(emptySteps)
  const [dragging, setDragging]     = useState(null)
  const [dragOver, setDragOver]     = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    if (openDropdown === null) return
    const close = () => setOpenDropdown(null)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [openDropdown])

  const usedKeys = steps.filter(Boolean).map(s => s.key)

  const drop = (index) => {
    setDragOver(null)
    if (!dragging || steps[index]) return
    const param = PARAMETERS.find(p => p.key === dragging)
    setSteps(prev => {
      const next = [...prev]
      next[index] = { ...param, ...initialThreshold(param) }
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

  const clear = (index) => {
    if (openDropdown === index) setOpenDropdown(null)
    setSteps(prev => {
      const next = [...prev]
      next[index] = null
      return next
    })
  }

  return (
    <div className="dt-panel">

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

      <div className="dt-steps">
        {steps.map((step, i) => (
          <Fragment key={i}>
            <div className="dt-step-col">
              <span className="dt-step-num">{i + 1}</span>
              <div
                className={[
                  'dt-step',
                  step           ? 'dt-step--filled' : 'dt-step--empty',
                  dragOver === i ? 'dt-step--over'   : '',
                ].join(' ')}
                onDragOver={e => { if (!step) { e.preventDefault(); setDragOver(i) } }}
                onDragLeave={() => setDragOver(null)}
                onDrop={() => drop(i)}
              >
                {step ? (
                  <>
                    <button className="dt-clear" onClick={() => clear(i)}>×</button>
                    <span className="dt-step-label">{step.label}</span>
                    <ThresholdInput
                      step={step}
                      index={i}
                      update={update}
                      openDropdown={openDropdown}
                      setOpenDropdown={setOpenDropdown}
                    />
                  </>
                ) : (
                  <span className="dt-hint">drop here</span>
                )}
              </div>
              <div className="dt-no-branch">
                <span className="dt-no-arrow">↓</span>
                <span className="dt-no-label">if no</span>
              </div>
            </div>
            <div className="dt-yes-arrow">
              <span className="dt-yes-label">if yes</span>
              <span className="dt-yes-sym">→</span>
            </div>
          </Fragment>
        ))}
        <div className="dt-approved">
          patient gets<br />approved
        </div>
      </div>

      <div className="dt-rejected">
        patient gets rejected
      </div>

    </div>
  )
}
