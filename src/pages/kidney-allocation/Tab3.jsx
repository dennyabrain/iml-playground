import { useState, useRef } from 'react'
import { getRandomPatient } from './fixtures'
import './PrototypeTab.css'

const FEATURES = [
  { key: 'age',              label: 'Age',               min: 0, max: 100, step: 1, default: 45 },
  { key: 'healthScore',      label: 'Health Score',      min: 1, max: 10,  step: 1, default: 5  },
  { key: 'priorTransplants', label: 'Prior Transplants', min: 0, max: 5,   step: 1, default: 0  },
  { key: 'yearsWaiting',     label: 'Years Waiting',     min: 0, max: 20,  step: 1, default: 5  },
  { key: 'dependents',       label: 'Dependents',        min: 0, max: 10,  step: 1, default: 2  },
  { key: 'urgencyScore',     label: 'Urgency Score',     min: 1, max: 10,  step: 1, default: 5  },
]

const FEATURE_MAP = Object.fromEntries(FEATURES.map(f => [f.key, f]))
const DEFAULT_STATE = Object.fromEntries(FEATURES.map(f => [f.key, f.default]))

const W = 300, H = 300
const PAD = { top: 20, right: 20, bottom: 52, left: 52 }
const IW = W - PAD.left - PAD.right
const IH = H - PAD.top - PAD.bottom

function valToX(val, f) {
  return PAD.left + ((val - f.min) / (f.max - f.min)) * IW
}
function valToY(val, f) {
  return PAD.top + (1 - (val - f.min) / (f.max - f.min)) * IH
}
function xToVal(px, f) {
  const t = Math.max(0, Math.min(1, (px - PAD.left) / IW))
  return Math.round((f.min + t * (f.max - f.min)) / f.step) * f.step
}
function yToVal(py, f) {
  const t = Math.max(0, Math.min(1, 1 - (py - PAD.top) / IH))
  return Math.round((f.min + t * (f.max - f.min)) / f.step) * f.step
}
function getTicks(f, targetCount = 5) {
  const rawInterval = (f.max - f.min) / (targetCount - 1)
  const interval = Math.max(f.step, Math.round(rawInterval / f.step) * f.step)
  const ticks = []
  for (let v = f.min; v <= f.max + interval * 0.01; v = Math.round((v + interval) / f.step) * f.step) {
    ticks.push(v)
  }
  return ticks
}

// Deterministic weighted model so live movement is meaningful
function mockModel(p) {
  const score =
    (p.urgencyScore - 1) / 9 * 0.35 +
    (1 - (p.healthScore - 1) / 9) * 0.25 +
    (p.yearsWaiting / 20) * 0.20 +
    (1 - p.age / 100) * 0.10 +
    (p.dependents / 10) * 0.05 +
    (1 - p.priorTransplants / 5) * 0.05
  return score > 0.5 ? 'Selected' : 'Rejected'
}

export default function Tab3() {
  const [selectedVars, setSelectedVars] = useState([])
  const [patient, setPatient]           = useState(DEFAULT_STATE)
  const [result, setResult]             = useState(null)
  const [dragging, setDragging]         = useState(false)
  const svgRef = useRef(null)

  const phase = selectedVars.length === 2 ? 'interact' : 'select'

  const toggleVar = (key) => {
    setSelectedVars(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : prev.length < 2 ? [...prev, key] : prev
    )
  }

  const generate = () => {
    const p = getRandomPatient()
    const next = Object.fromEntries(FEATURES.map(f => [f.key, p[f.key]]))
    setPatient(next)
    setResult(mockModel(next))
  }

  const applyFromSvg = (e) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const xf = FEATURE_MAP[selectedVars[0]]
    const yf = FEATURE_MAP[selectedVars[1]]
    setPatient(prev => {
      const next = {
        ...prev,
        [selectedVars[0]]: xToVal(e.clientX - rect.left, xf),
        [selectedVars[1]]: yToVal(e.clientY - rect.top, yf),
      }
      setResult(mockModel(next))
      return next
    })
  }

  const xFeat = phase === 'interact' ? FEATURE_MAP[selectedVars[0]] : null
  const yFeat = phase === 'interact' ? FEATURE_MAP[selectedVars[1]] : null
  const remaining = FEATURES.filter(f => !selectedVars.includes(f.key))

  return (
    <div className="ka-layout">
      <div className="ka-col">
        <button className="ka-btn" onClick={generate}>Generate Patient</button>

        {phase === 'select' && (
          <>
            <span className="ka-col-label">Select two variables to explore</span>
            <div className="ka-var-picker">
              {FEATURES.map(f => {
                const isSelected = selectedVars.includes(f.key)
                const isDisabled = !isSelected && selectedVars.length === 2
                return (
                  <button
                    key={f.key}
                    className={`ka-var-btn${isSelected ? ' ka-var-btn--selected' : ''}`}
                    disabled={isDisabled}
                    onClick={() => toggleVar(f.key)}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {phase === 'interact' && (
          <>
            <svg
              ref={svgRef}
              width={W}
              height={H}
              className="ka-plot"
              style={{ cursor: dragging ? 'grabbing' : 'crosshair' }}
              onPointerDown={e => {
                setDragging(true)
                e.currentTarget.setPointerCapture(e.pointerId)
                applyFromSvg(e)
              }}
              onPointerMove={e => { if (dragging) applyFromSvg(e) }}
              onPointerUp={() => setDragging(false)}
            >
              {/* Plot area */}
              <rect x={PAD.left} y={PAD.top} width={IW} height={IH} fill="#fafafa" stroke="#e8e8e8" strokeWidth={1} />

              {/* X grid + ticks */}
              {getTicks(xFeat).map(v => {
                const x = valToX(v, xFeat)
                return (
                  <g key={v}>
                    <line x1={x} y1={PAD.top} x2={x} y2={PAD.top + IH} stroke="#ececec" strokeWidth={1} />
                    <line x1={x} y1={PAD.top + IH} x2={x} y2={PAD.top + IH + 5} stroke="#c8c8c8" strokeWidth={1} />
                    <text x={x} y={PAD.top + IH + 18} textAnchor="middle" className="ka-axis-tick">{v}</text>
                  </g>
                )
              })}

              {/* Y grid + ticks */}
              {getTicks(yFeat).map(v => {
                const y = valToY(v, yFeat)
                return (
                  <g key={v}>
                    <line x1={PAD.left} y1={y} x2={PAD.left + IW} y2={y} stroke="#ececec" strokeWidth={1} />
                    <line x1={PAD.left - 5} y1={y} x2={PAD.left} y2={y} stroke="#c8c8c8" strokeWidth={1} />
                    <text x={PAD.left - 10} y={y} textAnchor="end" dominantBaseline="middle" className="ka-axis-tick">{v}</text>
                  </g>
                )
              })}

              {/* Axis labels */}
              <text x={PAD.left + IW / 2} y={H - 6} textAnchor="middle" className="ka-axis-label">
                {xFeat.label}
              </text>
              <text
                x={13}
                y={PAD.top + IH / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="ka-axis-label"
                transform={`rotate(-90, 13, ${PAD.top + IH / 2})`}
              >
                {yFeat.label}
              </text>

              {/* Dot */}
              <circle
                cx={valToX(patient[selectedVars[0]], xFeat)}
                cy={valToY(patient[selectedVars[1]], yFeat)}
                r={7}
                fill="#1a1a1a"
                style={{ pointerEvents: 'none' }}
              />
            </svg>

            {remaining.length > 0 && (
              <table className="ka-table">
                <tbody>
                  {remaining.map(({ key, label, min, max, step }) => (
                    <tr key={key}>
                      <td className="ka-table-label">{label}</td>
                      <td className="ka-table-input">
                        <div className="ka-slider-cell">
                          <span className="ka-slider-value">{patient[key]}</span>
                          <input
                            className="ka-slider"
                            type="range"
                            min={min} max={max} step={step}
                            value={patient[key]}
                            onChange={e => {
                              const next = { ...patient, [key]: Number(e.target.value) }
                              setPatient(next)
                              setResult(mockModel(next))
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <button className="ka-btn ka-back-btn" onClick={() => { setSelectedVars([]); setResult(null) }}>
              ← Change variables
            </button>
          </>
        )}
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
