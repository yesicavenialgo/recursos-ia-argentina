'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { fetchAdminCoursesRequest, fetchSubmissionsRequest } from '@/store/slices/adminSlice'

export default function AdminDashboardPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { courses, submissions } = useSelector((s: RootState) => s.admin)

  useEffect(() => {
    if (!localStorage.getItem('admin_tokens')) { router.push('/admin/login'); return }
    dispatch(fetchAdminCoursesRequest())
    dispatch(fetchSubmissionsRequest())
  }, [])

  const pending = submissions.filter((s) => s.status === 'pending').length

  const stats = [
    { label: 'Total cursos', value: courses.length, link: '/admin/courses' },
    { label: 'Pendientes de revisión', value: pending, link: '/admin/submissions', alert: pending > 0 },
    { label: 'Aprobados', value: submissions.filter((s) => s.status === 'approved').length, link: '/admin/submissions' },
  ]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>
      <div className="eyebrow" style={{ marginBottom: 14 }}>Panel de control</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--lunar-0)' }}>
          Dashboard
        </h1>
        <Link href="/admin/courses/new" style={{ padding: '10px 18px', background: 'var(--signal-400)', color: '#06142B', borderRadius: 8, fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
          + Nuevo curso
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
        {stats.map(({ label, value, link, alert }) => (
          <Link key={label} href={link} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--space-3)', border: `1px solid ${alert ? 'rgba(245,184,62,0.4)' : 'var(--border)'}`, borderRadius: 12, padding: '28px 24px', transition: 'all 180ms var(--ease-out)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: alert ? 'var(--warn)' : 'var(--lunar-5)', marginBottom: 12 }}>
                {label}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, color: alert ? '#F5CC6E' : 'var(--fg)', lineHeight: 1 }}>
                {value}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Link href="/admin/courses" style={{ textDecoration: 'none', padding: '20px 24px', background: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>Gestionar cursos</div>
            <div style={{ fontSize: 13, color: 'var(--lunar-5)' }}>Ver, editar y eliminar cursos publicados</div>
          </div>
          <span style={{ color: 'var(--signal-300)', fontSize: 20 }}>→</span>
        </Link>
        <Link href="/admin/submissions" style={{ textDecoration: 'none', padding: '20px 24px', background: 'var(--space-3)', border: `1px solid ${pending > 0 ? 'rgba(245,184,62,0.4)' : 'var(--border)'}`, borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>Cola de revisión</div>
            <div style={{ fontSize: 13, color: 'var(--lunar-5)' }}>{pending > 0 ? `${pending} curso${pending > 1 ? 's' : ''} esperando revisión` : 'Sin pendientes'}</div>
          </div>
          <span style={{ color: pending > 0 ? '#F5CC6E' : 'var(--signal-300)', fontSize: 20 }}>→</span>
        </Link>
      </div>
    </div>
  )
}
