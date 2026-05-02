'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { fetchSubmissionsRequest, approveSubmissionRequest, rejectSubmissionRequest, clearMessages } from '@/store/slices/adminSlice'

const STATUS_CONFIG = {
  pending:  { label: 'Pendiente', cls: 'badge-warn' },
  approved: { label: 'Aprobado',  cls: 'badge-ok' },
  rejected: { label: 'Rechazado', cls: 'badge-danger' },
}
const SOURCE_LABEL: Record<string, string> = { community: 'Comunidad', scraper: 'Scraper', admin: 'Admin' }

export default function AdminSubmissionsPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { submissions, loading, success, error } = useSelector((s: RootState) => s.admin)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')

  useEffect(() => {
    if (!localStorage.getItem('admin_tokens')) { router.push('/admin/login'); return }
    dispatch(fetchSubmissionsRequest())
  }, [])

  useEffect(() => {
    if (success || error) setTimeout(() => dispatch(clearMessages()), 3000)
  }, [success, error])

  const visible = filter === 'all' ? submissions : submissions.filter((s) => s.status === filter)

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Panel admin</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--lunar-0)' }}>Cola de revisión</h1>
        </div>
        <Link href="/admin/dashboard" style={{ padding: '9px 16px', background: 'var(--space-3)', color: 'var(--fg)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, textDecoration: 'none' }}>← Dashboard</Link>
      </div>

      {(success || error) && (
        <div style={{ padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 20, background: success ? 'rgba(63,191,127,0.12)' : 'rgba(226,85,85,0.12)', border: `1px solid ${success ? 'rgba(63,191,127,0.3)' : 'rgba(226,85,85,0.3)'}`, color: success ? '#6BE0A0' : '#F2867D' }}>
          {success || error}
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display: 'inline-flex', background: 'var(--space-2)', border: '1px solid var(--border)', borderRadius: 10, padding: 3, marginBottom: 24, gap: 2 }}>
        {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => {
          const count = f === 'all' ? submissions.length : submissions.filter((s) => s.status === f).length
          return (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 14px', borderRadius: 7, fontSize: 13, border: 0, cursor: 'pointer', transition: 'all 120ms', background: filter === f ? 'var(--space-4)' : 'transparent', color: filter === f ? 'var(--fg)' : 'var(--lunar-4)' }}>
              {f === 'all' ? 'Todos' : f === 'pending' ? 'Pendientes' : f === 'approved' ? 'Aprobados' : 'Rechazados'} <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.7 }}>({count})</span>
            </button>
          )
        })}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 80, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--lunar-5)' }}>CARGANDO...</div>
      ) : visible.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 80, color: 'var(--lunar-5)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--fg)', marginBottom: 6 }}>Sin resultados</div>
          <p style={{ fontSize: 14 }}>No hay envíos en esta categoría.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {visible.map((sub) => {
            const cfg = STATUS_CONFIG[sub.status]
            return (
              <div key={sub.id} style={{ background: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className={`badge ${cfg.cls}`}><span className="dot" />{cfg.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--lunar-5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {SOURCE_LABEL[sub.source ?? 'community']}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--fg)' }}>{sub.title}</div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--lunar-5)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                    <span>{sub.platform}</span>
                    <span>{sub.language.toUpperCase()}</span>
                    <span>{new Date(sub.submitted_at).toLocaleDateString('es-AR')}</span>
                  </div>
                  {sub.description && <p style={{ fontSize: 13, color: 'var(--lunar-4)', lineHeight: 1.5 }}>{sub.description}</p>}
                  <a href={sub.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--signal-300)', textDecoration: 'none' }}>{sub.url}</a>
                </div>

                {sub.status === 'pending' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <button onClick={() => dispatch(approveSubmissionRequest(sub.id))} style={{ padding: '8px 20px', background: 'rgba(63,191,127,0.15)', color: '#6BE0A0', border: '1px solid rgba(63,191,127,0.35)', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                      Aprobar
                    </button>
                    <button onClick={() => dispatch(rejectSubmissionRequest(sub.id))} style={{ padding: '8px 20px', background: 'transparent', color: 'var(--lunar-5)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
