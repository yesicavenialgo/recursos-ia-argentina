'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminLogin } from '@/lib/adminApi'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const data = await adminLogin(email, password)
      localStorage.setItem('admin_tokens', JSON.stringify({ access: data.access, refresh: data.refresh }))
      router.push('/admin/dashboard')
    } catch {
      setError('Credenciales incorrectas o sin permisos de admin.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { padding: '11px 14px', background: 'var(--space-2)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--fg)', fontSize: 14, outline: 0, width: '100%' }
  const labelStyle = { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--lunar-5)' }

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <div style={{ width: '100%', maxWidth: 380, background: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 16, padding: 36 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Control de misión</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--lunar-0)', marginBottom: 28 }}>
          Acceso admin
        </h1>

        {error && (
          <div style={{ padding: '10px 14px', background: 'rgba(226,85,85,0.12)', border: '1px solid rgba(226,85,85,0.3)', borderRadius: 8, fontSize: 13, color: '#F2867D', marginBottom: 20 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={labelStyle}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={labelStyle}>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '12px', background: 'var(--signal-400)', color: '#06142B', border: 0, borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer', opacity: loading ? 0.7 : 1, marginTop: 4 }}>
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
