import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Submission } from '@/lib/types'

interface SubmissionsState {
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: SubmissionsState = {
  loading: false,
  error: null,
  success: false,
}

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    createSubmissionRequest(state, _action: PayloadAction<Omit<Submission, 'id' | 'status' | 'submitted_at'>>) {
      state.loading = true
      state.error = null
      state.success = false
    },
    createSubmissionSuccess(state) {
      state.loading = false
      state.success = true
    },
    createSubmissionFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    resetSubmissionStatus(state) {
      state.success = false
      state.error = null
    },
  },
})

export const {
  createSubmissionRequest,
  createSubmissionSuccess,
  createSubmissionFailure,
  resetSubmissionStatus,
} = submissionsSlice.actions

export default submissionsSlice.reducer
