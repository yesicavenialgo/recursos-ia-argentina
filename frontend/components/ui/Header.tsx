'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const isAdmin = pathname.startsWith('/admin')
  const [isAdminLogged, setIsAdminLogged] = useState(false)

  useEffect(() => {
    setIsAdminLogged(!!localStorage.getItem('admin_tokens'))
  }, [pathname])

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
        {isAdminLogged && (
          <>
            {!isAdmin && (
              <Link href="/admin/dashboard" style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                background: 'var(--space-4)', color: 'var(--fg)', border: '1px solid var(--border)', textDecoration: 'none',
              }}>
                Panel de control
              </Link>
            )}
            <button onClick={() => { localStorage.removeItem('admin_tokens'); setIsAdminLogged(false); router.push('/') }} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
              background: 'rgba(226,85,85,0.12)', color: '#F2867D', border: '1px solid rgba(226,85,85,0.3)', cursor: 'pointer',
            }}>
              Cerrar sesión
            </button>
          </>
        )}
        {!isAdmin && pathname !== '/suggest' && (
          <Link href="/suggest" style={{
            padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
            background: 'var(--signal-400)', color: '#06142B', textDecoration: 'none',
          }}>
            + Agregar curso
          </Link>
        )}
      </nav>
    </header>
  )
}
