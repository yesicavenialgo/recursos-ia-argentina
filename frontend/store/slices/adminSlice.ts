import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Course, Submission } from '@/lib/types'

interface AdminState {
  courses: Course[]
  submissions: Submission[]
  stats: { total_courses: number; pending_submissions: number } | null
  loading: boolean
  error: string | null
  success: string | null
}

const initialState: AdminState = {
  courses: [],
  submissions: [],
  stats: null,
  loading: false,
  error: null,
  success: null,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    fetchAdminCoursesRequest(state) { state.loading = true; state.error = null },
    fetchAdminCoursesSuccess(state, action: PayloadAction<Course[]>) { state.loading = false; state.courses = action.payload },
    fetchAdminCoursesFailure(state, action: PayloadAction<string>) { state.loading = false; state.error = action.payload },

    createCourseRequest(state, _action: PayloadAction<Partial<Course>>) { state.loading = true; state.error = null; state.success = null },
    createCourseSuccess(state, action: PayloadAction<Course>) {
      state.loading = false; state.success = 'Curso creado correctamente.'
      state.courses.unshift(action.payload)
    },
    createCourseFailure(state, action: PayloadAction<string>) { state.loading = false; state.error = action.payload },

    updateCourseRequest(state, _action: PayloadAction<{ id: number; data: Partial<Course> }>) { state.loading = true; state.error = null; state.success = null },
    updateCourseSuccess(state, action: PayloadAction<Course>) {
      state.loading = false; state.success = 'Curso actualizado.'
      state.courses = state.courses.map((c) => c.id === action.payload.id ? action.payload : c)
    },
    updateCourseFailure(state, action: PayloadAction<string>) { state.loading = false; state.error = action.payload },

    deleteCourseRequest(state, _action: PayloadAction<number>) { state.loading = true; state.error = null },
    deleteCourseSuccess(state, action: PayloadAction<number>) {
      state.loading = false; state.courses = state.courses.filter((c) => c.id !== action.payload)
    },
    deleteCourseFailure(state, action: PayloadAction<string>) { state.loading = false; state.error = action.payload },

    fetchSubmissionsRequest(state) { state.loading = true; state.error = null },
    fetchSubmissionsSuccess(state, action: PayloadAction<Submission[]>) { state.loading = false; state.submissions = action.payload },
    fetchSubmissionsFailure(state, action: PayloadAction<string>) { state.loading = false; state.error = action.payload },

    approveSubmissionRequest(state, _action: PayloadAction<number>) { state.loading = true },
    approveSubmissionSuccess(state, action: PayloadAction<number>) {
      state.loading = false; state.success = 'Curso aprobado y publicado.'
      state.submissions = state.submissions.map((s) => s.id === action.payload ? { ...s, status: 'approved' as const } : s)
    },
    rejectSubmissionRequest(state, _action: PayloadAction<number>) { state.loading = true },
    rejectSubmissionSuccess(state, action: PayloadAction<number>) {
      state.loading = false; state.success = 'Envío rechazado.'
      state.submissions = state.submissions.map((s) => s.id === action.payload ? { ...s, status: 'rejected' as const } : s)
    },
    actionFailure(state, action: PayloadAction<string>) { state.loading = false; state.error = action.payload },

    clearMessages(state) { state.error = null; state.success = null },
  },
})

export const {
  fetchAdminCoursesRequest, fetchAdminCoursesSuccess, fetchAdminCoursesFailure,
  createCourseRequest, createCourseSuccess, createCourseFailure,
  updateCourseRequest, updateCourseSuccess, updateCourseFailure,
  deleteCourseRequest, deleteCourseSuccess, deleteCourseFailure,
  fetchSubmissionsRequest, fetchSubmissionsSuccess, fetchSubmissionsFailure,
  approveSubmissionRequest, approveSubmissionSuccess,
  rejectSubmissionRequest, rejectSubmissionSuccess,
  actionFailure, clearMessages,
} = adminSlice.actions

export default adminSlice.reducer
