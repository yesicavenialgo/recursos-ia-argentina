'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { fetchAdminCoursesRequest, deleteCourseRequest, clearMessages } from '@/store/slices/adminSlice'

const LEVEL_LABELS: Record<string, string> = { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' }

export default function AdminCoursesPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { courses, loading, success, error } = useSelector((s: RootState) => s.admin)
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

  useEffect(() => {
    if (!localStorage.getItem('admin_tokens')) { router.push('/admin/login'); return }
    dispatch(fetchAdminCoursesRequest())
  }, [])

  useEffect(() => {
    if (success || error) { setTimeout(() => dispatch(clearMessages()), 3000) }
  }, [success, error])

  const handleDelete = (id: number) => {
    dispatch(deleteCourseRequest(id))
    setConfirmDelete(null)
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Panel admin</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--lunar-0)' }}>Cursos</h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/admin/dashboard" style={{ padding: '9px 16px', background: 'var(--space-3)', color: 'var(--fg)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, textDecoration: 'none' }}>← Dashboard</Link>
          <Link href="/admin/courses/new" style={{ padding: '9px 16px', background: 'var(--signal-400)', color: '#06142B', borderRadius: 8, fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>+ Nuevo curso</Link>
        </div>
      </div>

      {(success || error) && (
        <div style={{ padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 20, background: success ? 'rgba(63,191,127,0.12)' : 'rgba(226,85,85,0.12)', border: `1px solid ${success ? 'rgba(63,191,127,0.3)' : 'rgba(226,85,85,0.3)'}`, color: success ? '#6BE0A0' : '#F2867D' }}>
          {success || error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 80, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--lunar-5)' }}>CARGANDO...</div>
      ) : (
        <div style={{ background: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Título', 'Plataforma', 'Nivel', 'Idioma', 'Estado', 'Acciones'].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--lunar-5)', textAlign: 'left', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 500, color: 'var(--fg)', maxWidth: 280 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.title}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--lunar-4)' }}>{course.platform}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--lunar-4)' }}>{LEVEL_LABELS[course.level]}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--lunar-5)', fontFamily: 'var(--font-mono)' }}>{course.language.toUpperCase()}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 11, fontFamily: 'var(--font-mono)', background: course.is_active ? 'rgba(63,191,127,0.14)' : 'rgba(139,153,184,0.14)', color: course.is_active ? '#6BE0A0' : '#B3BDD1' }}>
                      {course.is_active ? 'Activo' : 'Oculto'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Link href={`/admin/courses/${course.id}/edit`} style={{ padding: '5px 12px', fontSize: 12, background: 'var(--space-4)', color: 'var(--fg)', borderRadius: 6, textDecoration: 'none' }}>Editar</Link>
                      {confirmDelete === course.id ? (
                        <>
                          <button onClick={() => handleDelete(course.id)} style={{ padding: '5px 12px', fontSize: 12, background: 'rgba(226,85,85,0.2)', color: '#F2867D', border: '1px solid rgba(226,85,85,0.4)', borderRadius: 6, cursor: 'pointer' }}>Confirmar</button>
                          <button onClick={() => setConfirmDelete(null)} style={{ padding: '5px 12px', fontSize: 12, background: 'var(--space-4)', color: 'var(--lunar-4)', border: 0, borderRadius: 6, cursor: 'pointer' }}>Cancelar</button>
                        </>
                      ) : (
                        <button onClick={() => setConfirmDelete(course.id)} style={{ padding: '5px 12px', fontSize: 12, background: 'transparent', color: 'var(--lunar-5)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}>Eliminar</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
