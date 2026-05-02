'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--bg-elev)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      height: 72,
      display: 'flex', alignItems: 'center',
      padding: '0 32px', gap: 24,
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #EAF0FF, #B8BFCF 55%, #4A5167)',
          boxShadow: 'inset -5px -7px 12px rgba(0,0,0,0.55), inset 2px 3px 8px rgba(255,255,255,0.2)',
          flexShrink: 0,
        }} />
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, letterSpacing: '-0.02em', color: 'var(--fg)' }}>
            IA
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', color: 'var(--signal-300)', marginTop: 2 }}>
            RECURSOS AR
          </div>
        </div>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
        <Link href="/suggest" style={{
          padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
          background: 'var(--signal-400)', color: '#06142B', textDecoration: 'none',
        }}>
          + Agregar curso
        </Link>
      </nav>
    </header>
  )
}
