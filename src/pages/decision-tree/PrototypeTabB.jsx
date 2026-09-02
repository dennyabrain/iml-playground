import { useState, useMemo, useEffect } from 'react'
import './PrototypeTabB.css'

const PARAMS = [
  { key: 'dependents', label: 'Dependents' },
  { key: 'age',        label: 'Age' },
  { key: 'wait',       label: 'Years of Wait' },
  { key: 'health',     label: 'Health Score' },
  { key: 'urgency',    label: 'Urgency' },
]

const OPS = ['<', '≤', '=', '≥', '>']

const MAX_NODES = 7
const COL_W    = 290
const NODE_W   = 210
const NODE_H   = 108
const SLOT_W   = 140
const SLOT_H   = 72
const PAD_X    = 60
const PAD_Y    = 50
const GAP      = 20   // minimum vertical gap between sibling bounding boxes

let _uid = 0
const uid = () => `n${++_uid}`

function mkNode(paramKey) {
  const p = PARAMS.find(x => x.key === paramKey)
  return { id: uid(), paramKey, paramLabel: p.label, op: '>', val: '0', yes: null, no: null }
}

// Returns the pixel height of the bounding box of a subtree.
// Leaves occupy SLOT_H; nodes recursively combine their children with GAP.
function spanOf(nodes, ref) {
  if (ref === null || ref === 'a' || ref === 'b') return SLOT_H
  const n = nodes[ref]
  if (!n) return SLOT_H
  return Math.max(NODE_H, spanOf(nodes, n.yes) + GAP + spanOf(nodes, n.no))
}

// Compute pixel positions for every node and every open slot.
// np: { [nodeId]: { x, y } }  — y is the vertical centre of the node
// sp: { [slotKey]: { x, y, branch, outcome, parentId } }  — y is the vertical centre of the slot
// topY is the top of the subtree's bounding box (pixels, before PAD_Y is added).
function computeLayout(nodes, rootId) {
  const np = {}
  const sp = {}

  function place(ref, col, topY) {
    if (!ref || ref === 'a' || ref === 'b') return
    const node = nodes[ref]
    if (!node) return

    const ySpan = spanOf(nodes, node.yes)
    const nSpan = spanOf(nodes, node.no)

    const yesCenterY = topY + ySpan / 2
    const noTopY     = topY + ySpan + GAP
    const noCenterY  = noTopY + nSpan / 2
    // Parent sits at the midpoint between the two child centres
    const nodeCY     = (yesCenterY + noCenterY) / 2

    np[ref] = { x: PAD_X + col * COL_W, y: PAD_Y + nodeCY }

    if (node.yes === null || node.yes === 'a' || node.yes === 'b') {
      sp[`${ref}_yes`] = { x: PAD_X + (col + 1) * COL_W, y: PAD_Y + yesCenterY, branch: 'yes', outcome: node.yes, parentId: ref }
    } else {
      place(node.yes, col + 1, topY)
    }

    if (node.no === null || node.no === 'a' || node.no === 'b') {
      sp[`${ref}_no`] = { x: PAD_X + (col + 1) * COL_W, y: PAD_Y + noCenterY, branch: 'no', outcome: node.no, parentId: ref }
    } else {
      place(node.no, col + 1, noTopY)
    }
  }

  if (rootId && nodes[rootId]) place(rootId, 0, 0)
  return { np, sp }
}

export default function PrototypeTabB() {
  const [nodes,    setNodes]    = useState({})
  const [rootId,   setRootId]   = useState(null)
  const [dragging, setDragging] = useState(null)
  const [dragOver, setDragOver] = useState(null)

  const nodeCount  = Object.keys(nodes).length
  const canAddNode = nodeCount < MAX_NODES

  // Body's max-width: 720px would clip the canvas — suppress overflow-x while mounted
  useEffect(() => {
    const prev = document.body.style.overflowX
    document.body.style.overflowX = 'hidden'
    return () => { document.body.style.overflowX = prev }
  }, [])

  const { np, sp } = useMemo(() => computeLayout(nodes, rootId), [nodes, rootId])

  const allX   = [PAD_X + SLOT_W, ...Object.values(np).map(p => p.x + NODE_W), ...Object.values(sp).map(s => s.x + SLOT_W)]
  const allY   = [PAD_Y + SLOT_H, ...Object.values(np).map(p => p.y + NODE_H / 2), ...Object.values(sp).map(s => s.y + SLOT_H / 2)]
  const canvasW = Math.max(600, Math.max(...allX) + PAD_X)
  const canvasH = Math.max(500, Math.max(...allY) + PAD_Y)

  // ── Actions ──────────────────────────────────────────────────────────────

  function dropRoot() {
    if (!dragging || !canAddNode) return
    const node = mkNode(dragging)
    setNodes({ [node.id]: node })
    setRootId(node.id)
    setDragging(null)
    setDragOver(null)
  }

  function dropOnSlot(slotKey) {
    if (!dragging || !canAddNode) return
    const slot = sp[slotKey]
    if (!slot) return
    const newNode = mkNode(dragging)
    setNodes(prev => {
      const next   = { ...prev, [newNode.id]: newNode }
      const parent = { ...next[slot.parentId], [slot.branch]: newNode.id }
      next[slot.parentId] = parent
      return next
    })
    setDragging(null)
    setDragOver(null)
  }

  function setOutcome(slotKey, outcome) {
    const slot = sp[slotKey]
    if (!slot) return
    setNodes(prev => ({
      ...prev,
      [slot.parentId]: { ...prev[slot.parentId], [slot.branch]: outcome },
    }))
  }

  function updateNode(id, field, val) {
    setNodes(prev => ({ ...prev, [id]: { ...prev[id], [field]: val } }))
  }

  function removeSubtree(id) {
    const toRemove = new Set()
    function collect(ref) {
      if (!ref || ref === 'a' || ref === 'b' || toRemove.has(ref)) return
      toRemove.add(ref)
      const n = nodes[ref]
      if (n) { collect(n.yes); collect(n.no) }
    }
    collect(id)

    setNodes(prev => {
      const next = {}
      for (const [k, v] of Object.entries(prev)) {
        if (toRemove.has(k)) continue
        const n = { ...v }
        if (toRemove.has(n.yes)) n.yes = null
        if (toRemove.has(n.no))  n.no  = null
        next[k] = n
      }
      return next
    })
    if (toRemove.has(rootId)) setRootId(null)
  }

  // ── SVG connections ──────────────────────────────────────────────────────

  const svgLines = []
  for (const [id, pos] of Object.entries(np)) {
    const node = nodes[id]
    for (const branch of ['yes', 'no']) {
      const isYes  = branch === 'yes'
      const color  = isYes ? '#22c55e' : '#ef4444'
      const fromX  = pos.x + NODE_W
      const fromY  = pos.y + (isYes ? -NODE_H / 4 : NODE_H / 4)

      let toX, toY
      const childRef = node[branch]
      if (childRef && childRef !== 'a' && childRef !== 'b' && np[childRef]) {
        toX = np[childRef].x
        toY = np[childRef].y
      } else {
        const slot = sp[`${id}_${branch}`]
        if (!slot) continue
        toX = slot.x
        toY = slot.y
      }

      const mx = fromX + (toX - fromX) * 0.55
      svgLines.push(
        <g key={`${id}_${branch}`}>
          <path
            d={`M ${fromX} ${fromY} C ${mx} ${fromY}, ${mx} ${toY}, ${toX} ${toY}`}
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            strokeDasharray={isYes ? undefined : '5 3'}
            opacity="0.75"
          />
          <text x={fromX + 6} y={fromY - 5} fill={color} fontSize="9" fontFamily="var(--font)" fontWeight="600">
            {isYes ? 'YES' : 'NO'}
          </text>
        </g>
      )
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="dtb-layout">

      {/* Sidebar palette */}
      <div className="dtb-sidebar">
        <div className="dtb-palette-heading">Parameters</div>
        <p className="dtb-palette-sub">
          Each block is the <em>difference</em> between two patients.
          Same parameter may be used multiple times.
        </p>
        <div className="dtb-blocks">
          {PARAMS.map(p => (
            <div
              key={p.key}
              className="dtb-block"
              draggable
              onDragStart={() => setDragging(p.key)}
              onDragEnd={() => setDragging(null)}
            >
              Diff({p.label})
            </div>
          ))}
        </div>
        <div className="dtb-count">{nodeCount} / {MAX_NODES} nodes</div>
        {nodeCount > 0 && (
          <button className="dtb-reset" onClick={() => { setNodes({}); setRootId(null) }}>
            Reset tree
          </button>
        )}
      </div>

      {/* Scrollable canvas */}
      <div className="dtb-canvas-wrap">
        <div className="dtb-canvas" style={{ width: canvasW, height: canvasH }}>

          <svg
            style={{ position: 'absolute', inset: 0, width: canvasW, height: canvasH, pointerEvents: 'none', overflow: 'visible' }}
          >
            {svgLines}
          </svg>

          {/* Empty-tree root drop zone */}
          {!rootId && (
            <div
              className={`dtb-root-zone${dragOver === 'root' && canAddNode ? ' dtb-zone--over' : ''}`}
              style={{ left: PAD_X, top: '50%', transform: 'translateY(-50%)' }}
              onDragOver={e => { if (canAddNode) { e.preventDefault(); setDragOver('root') } }}
              onDragLeave={() => setDragOver(null)}
              onDrop={dropRoot}
            >
              Drop first condition here
            </div>
          )}

          {/* Condition nodes */}
          {Object.entries(np).map(([id, pos]) => {
            const node = nodes[id]
            return (
              <div
                key={id}
                className="dtb-node"
                style={{ left: pos.x, top: pos.y - NODE_H / 2, width: NODE_W, height: NODE_H }}
              >
                <button className="dtb-node-x" onClick={() => removeSubtree(id)}>×</button>
                <div className="dtb-node-param">Diff({node.paramLabel})</div>
                <div className="dtb-node-cond">
                  <select
                    className="dtb-op"
                    value={node.op}
                    onChange={e => updateNode(id, 'op', e.target.value)}
                  >
                    {OPS.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <input
                    className="dtb-val"
                    type="number"
                    value={node.val}
                    onChange={e => updateNode(id, 'val', e.target.value)}
                  />
                </div>
              </div>
            )
          })}

          {/* Open slots and terminal nodes */}
          {Object.entries(sp).map(([key, slot]) => {
            if (slot.outcome === 'a' || slot.outcome === 'b') {
              return (
                <div
                  key={key}
                  className={`dtb-terminal dtb-terminal--${slot.outcome}`}
                  style={{ left: slot.x, top: slot.y - SLOT_H / 2, width: SLOT_W, height: SLOT_H }}
                >
                  <button className="dtb-term-x" onClick={() => setOutcome(key, null)}>×</button>
                  <span>{slot.outcome === 'a' ? 'A Preferred' : 'B Preferred'}</span>
                </div>
              )
            }

            return (
              <div
                key={key}
                className={`dtb-slot dtb-slot--${slot.branch}${dragOver === key && canAddNode ? ' dtb-slot--over' : ''}`}
                style={{ left: slot.x, top: slot.y - SLOT_H / 2, width: SLOT_W, height: SLOT_H }}
                onDragOver={e => { if (canAddNode) { e.preventDefault(); setDragOver(key) } }}
                onDragLeave={() => setDragOver(null)}
                onDrop={() => dropOnSlot(key)}
              >
                <span className="dtb-slot-drop">drop condition</span>
                <div className="dtb-slot-btns">
                  <button onClick={() => setOutcome(key, 'a')}>A wins</button>
                  <button onClick={() => setOutcome(key, 'b')}>B wins</button>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}
