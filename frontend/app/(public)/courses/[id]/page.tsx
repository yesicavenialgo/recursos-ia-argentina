'use client'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { fetchCourseRequest } from '@/store/slices/coursesSlice'

const CATEGORY_LABELS: Record<string, string> = {
  use_ai: 'Usar IA', code_with_ai: 'Programar con IA', ml_fundamentals: 'Fundamentos de ML',
  deep_learning: 'Deep Learning', data_science: 'Data Science',
  ai_tools: 'Herramientas de IA', agents: 'Agentes', ethics_ai: 'Ética en IA',
}
const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado',
}

export default function CourseDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const { selected: course, loading } = useSelector((s: RootState) => s.courses)

  useEffect(() => {
    if (id) dispatch(fetchCourseRequest(Number(id)))
  }, [id])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: 120, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--lunar-5)' }}>
      CARGANDO...
    </div>
  )

  if (!course) return null

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 32px' }}>
      <button onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--lunar-5)', fontSize: 13, background: 'none', border: 0, cursor: 'pointer', marginBottom: 24 }}>
        ← Volver
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className={`cc-tag tag-${course.category}`}>{CATEGORY_LABELS[course.category]}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--lunar-5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {LEVEL_LABELS[course.level]} · {course.language === 'es' ? 'Español' : 'Inglés'}
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 38, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--lunar-0)' }}>
          {course.title}
        </h1>

        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { label: 'Plataforma', value: course.platform },
            { label: 'Nivel', value: LEVEL_LABELS[course.level] },
            { label: 'Idioma', value: course.language === 'es' ? 'Español' : 'Inglés' },
            ...(course.duration_hours ? [{ label: 'Duración', value: `${course.duration_hours}h` }] : []),
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--lunar-4)' }}>
              <span style={{ color: 'var(--lunar-5)' }}>{label}:</span> {value}
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 16, color: 'var(--lunar-3)', lineHeight: 1.65, marginBottom: 36 }}>
        {course.description}
      </p>

      <div style={{ display: 'flex', gap: 12 }}>
        <a href={course.url} target="_blank" rel="noopener noreferrer" style={{
          padding: '12px 24px', background: 'var(--signal-400)', color: '#06142B',
          borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          Ir al curso →
        </a>
        <button onClick={() => router.back()} style={{
          padding: '12px 20px', background: 'var(--space-3)', color: 'var(--fg)',
          border: '1px solid var(--border)', borderRadius: 8, fontSize: 15, cursor: 'pointer',
        }}>
          Ver más cursos
        </button>
      </div>
    </div>
  )
}
