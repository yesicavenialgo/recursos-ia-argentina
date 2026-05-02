'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { createCourseRequest } from '@/store/slices/adminSlice'
import CourseForm from '@/components/admin/CourseForm'
import type { Course } from '@/lib/types'

export default function NewCoursePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((s: RootState) => s.admin)

  useEffect(() => {
    if (!localStorage.getItem('admin_tokens')) router.push('/admin/login')
  }, [])

  useEffect(() => {
    if (success) router.push('/admin/courses')
  }, [success])

  return (
    <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Panel admin</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--lunar-0)' }}>Nuevo curso</h1>
        </div>
        <Link href="/admin/courses" style={{ padding: '9px 16px', background: 'var(--space-3)', color: 'var(--fg)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, textDecoration: 'none' }}>← Volver</Link>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', background: 'rgba(226,85,85,0.12)', border: '1px solid rgba(226,85,85,0.3)', borderRadius: 8, fontSize: 13, color: '#F2867D', marginBottom: 20 }}>
          {error}
        </div>
      )}

      <CourseForm
        onSubmit={(data) => dispatch(createCourseRequest(data as Partial<Course>))}
        loading={loading}
        submitLabel="Crear curso"
      />
    </div>
  )
}
