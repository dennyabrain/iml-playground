import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PageLayout({ title, description, tabs }) {
  const [active, setActive] = useState(0)

  return (
    <main>
      <Link to="/" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        ← back
      </Link>

      <div style={{ marginTop: '24px', marginBottom: '32px' }}>
        <h1 style={{ marginBottom: '6px' }}>{title}</h1>
        <p>{description}</p>
      </div>

      <nav style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #e8e8e8', marginBottom: '32px' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0 0 10px',
              cursor: 'pointer',
              fontSize: '13px',
              fontFamily: 'var(--font)',
              color: active === i ? 'var(--text-primary)' : 'var(--text-muted)',
              fontWeight: active === i ? 500 : 300,
              borderBottom: active === i ? '1px solid var(--text-primary)' : '1px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div>{tabs[active].content}</div>
    </main>
  )
}
