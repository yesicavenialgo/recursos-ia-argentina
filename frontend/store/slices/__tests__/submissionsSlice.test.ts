import reducer, {
  createSubmissionRequest,
  createSubmissionSuccess,
  createSubmissionFailure,
  resetSubmissionStatus,
} from '../submissionsSlice'

const mockPayload = {
  title: 'Curso de Python',
  platform: 'YouTube',
  url: 'https://youtube.com/python',
  description: 'Aprende Python desde cero',
  language: 'es',
  level: 'beginner',
  category: 'code_with_ai',
}

describe('submissionsSlice', () => {
  const initialState = reducer(undefined, { type: '@@INIT' })

  it('estado inicial correcto', () => {
    expect(initialState.loading).toBe(false)
    expect(initialState.error).toBeNull()
    expect(initialState.success).toBe(false)
  })

  it('createSubmissionRequest activa loading', () => {
    const state = reducer(initialState, createSubmissionRequest(mockPayload))
    expect(state.loading).toBe(true)
    expect(state.success).toBe(false)
    expect(state.error).toBeNull()
  })

  it('createSubmissionSuccess marca success', () => {
    const state = reducer(initialState, createSubmissionSuccess())
    expect(state.loading).toBe(false)
    expect(state.success).toBe(true)
  })

  it('createSubmissionFailure guarda el error', () => {
    const state = reducer(initialState, createSubmissionFailure('Error al enviar'))
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Error al enviar')
    expect(state.success).toBe(false)
  })

  it('resetSubmissionStatus limpia success y error', () => {
    const dirtyState = reducer(initialState, createSubmissionFailure('Error'))
    const state = reducer(dirtyState, resetSubmissionStatus())
    expect(state.success).toBe(false)
    expect(state.error).toBeNull()
  })
})
