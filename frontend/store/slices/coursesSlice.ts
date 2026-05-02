import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Course, CourseFilters, FiltersData, PaginatedResponse } from '@/lib/types'

interface CoursesState {
  items: Course[]
  selected: Course | null
  filters: CourseFilters
  filtersData: FiltersData | null
  count: number
  loading: boolean
  error: string | null
}

const initialState: CoursesState = {
  items: [],
  selected: null,
  filters: {},
  filtersData: null,
  count: 0,
  loading: false,
  error: null,
}

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    fetchCoursesRequest(state, _action: PayloadAction<CourseFilters | undefined>) {
      state.loading = true
      state.error = null
    },
    fetchCoursesSuccess(state, action: PayloadAction<PaginatedResponse<Course>>) {
      state.loading = false
      state.items = action.payload.results
      state.count = action.payload.count
    },
    fetchCoursesFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    fetchCourseRequest(state, _action: PayloadAction<number>) {
      state.loading = true
      state.error = null
    },
    fetchCourseSuccess(state, action: PayloadAction<Course>) {
      state.loading = false
      state.selected = action.payload
    },
    fetchCourseFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    fetchFiltersSuccess(state, action: PayloadAction<FiltersData>) {
      state.filtersData = action.payload
    },
    setFilters(state, action: PayloadAction<CourseFilters>) {
      state.filters = action.payload
    },
  },
})

export const {
  fetchCoursesRequest,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  fetchCourseRequest,
  fetchCourseSuccess,
  fetchCourseFailure,
  fetchFiltersSuccess,
  setFilters,
} = coursesSlice.actions

export default coursesSlice.reducer
