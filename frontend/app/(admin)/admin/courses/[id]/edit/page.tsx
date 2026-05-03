'use client'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { fetchAdminCoursesRequest, updateCourseRequest } from '@/store/slices/adminSlice'
import CourseForm from '@/components/admin/CourseForm'
import type { Course } from '@/lib/types'

export default function EditCoursePage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const { courses, loading, success, error } = useSelector((s: RootState) => s.admin)
  const course = courses.find((c) => c.id === Number(id))

  useEffect(() => {
    if (!localStorage.getItem('admin_tokens')) { router.push('/admin/login'); return }
    if (!courses.length) dispatch(fetchAdminCoursesRequest())
  }, [])

  useEffect(() => {
    if (success) router.push('/admin/courses')
  }, [success])

  const handleSubmit = (data: Partial<Course>) => {
    dispatch(updateCourseRequest({ id: Number(id), data }))
  }

  if (!course) return (
    <div style={{ textAlign: 'center', padding: 80, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--lunar-5)' }}>
      CARGANDO...
    </div>
  )

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Panel admin</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--lunar-0)' }}>
            Editar curso
          </h1>
        </div>
        <button onClick={() => router.back()} style={{ padding: '9px 16px', background: 'var(--space-3)', color: 'var(--fg)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>
          ← Cancelar
        </button>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 20, background: 'rgba(226,85,85,0.12)', border: '1px solid rgba(226,85,85,0.3)', color: '#F2867D' }}>
          {error}
        </div>
      )}

      <CourseForm initial={course} onSubmit={handleSubmit} loading={loading} submitLabel="Guardar cambios" />
    </div>
  )
}
