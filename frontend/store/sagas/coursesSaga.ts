import { call, put, takeLatest } from 'redux-saga/effects'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as api from '@/lib/api'
import type { CourseFilters } from '@/lib/types'
import {
  fetchCoursesRequest, fetchCoursesSuccess, fetchCoursesFailure,
  fetchCourseRequest, fetchCourseSuccess, fetchCourseFailure,
  fetchFiltersSuccess,
} from '../slices/coursesSlice'

function* handleFetchCourses(action: PayloadAction<CourseFilters | undefined>) {
  try {
    const data: Awaited<ReturnType<typeof api.fetchCourses>> = yield call(api.fetchCourses, action.payload)
    yield put(fetchCoursesSuccess(data))
  } catch {
    yield put(fetchCoursesFailure('Error al cargar los cursos.'))
  }
}

function* handleFetchCourse(action: PayloadAction<number>) {
  try {
    const data: Awaited<ReturnType<typeof api.fetchCourse>> = yield call(api.fetchCourse, action.payload)
    yield put(fetchCourseSuccess(data))
    const filters: Awaited<ReturnType<typeof api.fetchFilters>> = yield call(api.fetchFilters)
    yield put(fetchFiltersSuccess(filters))
  } catch {
    yield put(fetchCourseFailure('Error al cargar el curso.'))
  }
}

function* handleFetchFilters() {
  try {
    const data: Awaited<ReturnType<typeof api.fetchFilters>> = yield call(api.fetchFilters)
    yield put(fetchFiltersSuccess(data))
  } catch {
    // filters are non-critical, silently ignore
  }
}

export function* coursesSaga() {
  yield takeLatest(fetchCoursesRequest.type, handleFetchCourses)
  yield takeLatest(fetchCourseRequest.type, handleFetchCourse)
}
