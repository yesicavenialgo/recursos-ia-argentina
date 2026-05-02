import reducer, {
  fetchCoursesRequest,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  fetchCourseSuccess,
  fetchCourseFailure,
  setFilters,
} from '../coursesSlice'
import type { Course } from '@/lib/types'

const mockCourse: Course = {
  id: 1,
  title: 'Curso de IA',
  platform: 'YouTube',
  url: 'https://youtube.com',
  description: 'Descripción',
  language: 'es',
  level: 'beginner',
  category: 'use_ai',
  duration_hours: null,
  source: 'admin',
  is_active: true,
  created_at: '2024-01-01T00:00:00Z',
}

describe('coursesSlice', () => {
  const initialState = reducer(undefined, { type: '@@INIT' })

  it('estado inicial correcto', () => {
    expect(initialState.items).toEqual([])
    expect(initialState.loading).toBe(false)
    expect(initialState.error).toBeNull()
  })

  it('fetchCoursesRequest activa loading', () => {
    const state = reducer(initialState, fetchCoursesRequest())
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('fetchCoursesSuccess carga los cursos', () => {
    const state = reducer(initialState, fetchCoursesSuccess({
      results: [mockCourse],
      count: 1,
      next: null,
      previous: null,
    }))
    expect(state.loading).toBe(false)
    expect(state.items).toHaveLength(1)
    expect(state.count).toBe(1)
  })

  it('fetchCoursesFailure guarda el error', () => {
    const state = reducer(initialState, fetchCoursesFailure('Error de red'))
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Error de red')
  })

  it('fetchCourseSuccess carga el curso seleccionado', () => {
    const state = reducer(initialState, fetchCourseSuccess(mockCourse))
    expect(state.selected).toEqual(mockCourse)
  })

  it('fetchCourseFailure guarda el error', () => {
    const state = reducer(initialState, fetchCourseFailure('No encontrado'))
    expect(state.error).toBe('No encontrado')
  })

  it('setFilters actualiza los filtros', () => {
    const state = reducer(initialState, setFilters({ language: 'es', level: 'beginner' }))
    expect(state.filters).toEqual({ language: 'es', level: 'beginner' })
  })
})
