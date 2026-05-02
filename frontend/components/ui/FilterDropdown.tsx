'use client'
import { useState, useRef, useEffect } from 'react'

interface Option { value: string; label: string }

interface Props {
  label: string
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export default function FilterDropdown({ label, options, value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value) ?? options[0]
  const isActive = value !== ''

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
          fontFamily: 'var(--font-body)', transition: 'all 120ms var(--ease-out)',
          border: '1px solid',
          borderColor: isActive ? 'var(--signal-400)' : 'var(--border)',
          background: isActive ? 'rgba(77,166,245,0.1)' : 'var(--space-3)',
          color: isActive ? 'var(--signal-300)' : 'var(--lunar-4)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: isActive ? 'var(--signal-400)' : 'var(--lunar-5)' }}>
          {label}
        </span>
        {isActive && (
          <span style={{ fontSize: 13, color: 'var(--fg)', fontWeight: 500 }}>{selected.label}</span>
        )}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
          style={{ transition: 'transform 120ms', transform: open ? 'rotate(180deg)' : 'none', opacity: 0.6 }}>
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 50,
          background: 'var(--space-3)', border: '1px solid var(--border)',
          borderRadius: 10, padding: 4, minWidth: 160,
          boxShadow: 'var(--shadow-dark-md)',
        }}>
          {options.map((o) => {
            const active = o.value === value || (!value && o.value === '')
            return (
              <button key={o.value} onClick={() => { onChange(o.value); setOpen(false) }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '8px 12px', fontSize: 13, borderRadius: 7, border: 0, cursor: 'pointer',
                  background: active ? 'var(--space-4)' : 'transparent',
                  color: active ? 'var(--signal-300)' : 'var(--lunar-4)',
                  transition: 'all 100ms',
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--space-4)'; e.currentTarget.style.color = 'var(--fg)' }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--lunar-4)' } }}
              >
                {o.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
