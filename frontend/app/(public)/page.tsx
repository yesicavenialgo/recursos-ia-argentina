'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { fetchCoursesRequest, setFilters } from '@/store/slices/coursesSlice'
import CourseCard from '@/components/courses/CourseCard'
import FilterDropdown from '@/components/ui/FilterDropdown'
import type { CourseFilters } from '@/lib/types'

const LEVELS = [
  { value: '', label: 'Todos' },
  { value: 'beginner', label: 'Principiante' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzado' },
]
const LANGUAGES = [
  { value: '', label: 'Todos' },
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'Inglés' },
]
const CATEGORIES = [
  { value: '', label: 'Todas' },
  { value: 'use_ai', label: 'Usar IA' },
  { value: 'code_with_ai', label: 'Programar con IA' },
  { value: 'ml_fundamentals', label: 'ML' },
  { value: 'deep_learning', label: 'Deep Learning' },
  { value: 'data_science', label: 'Data Science' },
  { value: 'ai_tools', label: 'Herramientas' },
  { value: 'agents', label: 'Agentes' },
  { value: 'ethics_ai', label: 'Ética' },
]
const ORDERING = [
  { value: '-created_at', label: 'Más recientes' },
  { value: 'created_at', label: 'Más antiguos' },
  { value: 'title', label: 'A → Z' },
  { value: '-title', label: 'Z → A' },
]

export default function HomePage() {
  const dispatch = useDispatch()
  const { items, count, loading, filters } = useSelector((s: RootState) => s.courses)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchCoursesRequest(filters))
  }, [filters])

  const updateFilter = (patch: Partial<CourseFilters>) => {
    dispatch(setFilters({ ...filters, ...patch }))
    dispatch(fetchCoursesRequest({ ...filters, ...patch }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilter({ search })
  }

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 32px 48px' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'var(--signal-400)', display: 'inline-block' }} />
            Directorio de cursos gratuitos
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 48, lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--fg)', marginBottom: 14, maxWidth: 680 }}>
            Aprendé IA.<br />Gratis. En serio.
          </h1>
          <p style={{ fontSize: 16, color: 'var(--fg-muted)', lineHeight: 1.55, marginBottom: 28, maxWidth: 560 }}>
            Los mejores cursos de Inteligencia Artificial, en español e inglés, seleccionados para la comunidad.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} style={{ maxWidth: 640 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: '0 0 32px rgba(77,166,245,0.12)', transition: 'border-color 120ms, box-shadow 120ms' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--signal-400)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar cursos de IA..."
                style={{ flex: 1, background: 'transparent', border: 0, outline: 0, color: 'var(--fg)', fontSize: 16, fontFamily: 'var(--font-body)' }}
              />
              <button type="submit" style={{ padding: '6px 14px', background: 'var(--signal-400)', color: '#06142B', borderRadius: 8, border: 0, fontWeight: 500, fontSize: 13, cursor: 'pointer', flexShrink: 0 }}>
                Buscar
              </button>
            </div>
          </form>

        </div>
      </section>

      {/* Content */}
      <div style={{ padding: '40px 32px 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <FilterDropdown
              label="Idioma"
              options={LANGUAGES}
              value={filters.language ?? ''}
              onChange={(v) => updateFilter({ language: v || undefined })}
            />
            <FilterDropdown
              label="Nivel"
              options={LEVELS}
              value={filters.level ?? ''}
              onChange={(v) => updateFilter({ level: v || undefined })}
            />
            <FilterDropdown
              label="Categoría"
              options={CATEGORIES}
              value={filters.category ?? ''}
              onChange={(v) => updateFilter({ category: v || undefined })}
            />
            {(filters.language || filters.level || filters.category) && (
              <button onClick={() => updateFilter({ language: undefined, level: undefined, category: undefined })}
                style={{ padding: '8px 12px', fontSize: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--lunar-5)', cursor: 'pointer', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
                Limpiar ✕
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--lunar-5)' }}>
              <b style={{ color: 'var(--fg)', fontWeight: 500 }}>{count}</b> cursos
            </span>
            <FilterDropdown
              label="Orden"
              options={ORDERING}
              value={filters.ordering ?? '-created_at'}
              onChange={(v) => updateFilter({ ordering: v })}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: 'var(--lunar-5)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em' }}>
            CARGANDO...
          </div>
        ) : items.length === 0 && (filters.language || filters.level || filters.category || filters.search) ? (
          <div style={{ textAlign: 'center', padding: 80, color: 'var(--lunar-5)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--fg)', marginBottom: 6 }}>Sin resultados</div>
            <p style={{ fontSize: 14 }}>Probá con otros filtros o términos de búsqueda.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {items.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        )}
      </div>
      </div>
    </>
  )
}
