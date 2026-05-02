import { call, put, takeLatest } from 'redux-saga/effects'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as api from '@/lib/adminApi'
import type { Course } from '@/lib/types'
import {
  fetchAdminCoursesRequest, fetchAdminCoursesSuccess, fetchAdminCoursesFailure,
  createCourseRequest, createCourseSuccess, createCourseFailure,
  updateCourseRequest, updateCourseSuccess, updateCourseFailure,
  deleteCourseRequest, deleteCourseSuccess, deleteCourseFailure,
  fetchSubmissionsRequest, fetchSubmissionsSuccess, fetchSubmissionsFailure,
  approveSubmissionRequest, approveSubmissionSuccess,
  rejectSubmissionRequest, rejectSubmissionSuccess,
  actionFailure,
} from '../slices/adminSlice'

function* handleFetchCourses() {
  try {
    const data: Course[] = yield call(api.fetchAdminCourses)
    yield put(fetchAdminCoursesSuccess(data))
  } catch { yield put(fetchAdminCoursesFailure('Error al cargar cursos.')) }
}

function* handleCreateCourse(action: PayloadAction<Partial<Course>>) {
  try {
    const data: Course = yield call(api.createCourse, action.payload)
    yield put(createCourseSuccess(data))
  } catch { yield put(createCourseFailure('Error al crear el curso.')) }
}

function* handleUpdateCourse(action: PayloadAction<{ id: number; data: Partial<Course> }>) {
  try {
    const data: Course = yield call(api.updateCourse, action.payload.id, action.payload.data)
    yield put(updateCourseSuccess(data))
  } catch { yield put(updateCourseFailure('Error al actualizar el curso.')) }
}

function* handleDeleteCourse(action: PayloadAction<number>) {
  try {
    yield call(api.deleteCourse, action.payload)
    yield put(deleteCourseSuccess(action.payload))
  } catch { yield put(deleteCourseFailure('Error al eliminar el curso.')) }
}

function* handleFetchSubmissions() {
  try {
    const data: Awaited<ReturnType<typeof api.fetchAdminSubmissions>> | { results: Awaited<ReturnType<typeof api.fetchAdminSubmissions>> } = yield call(api.fetchAdminSubmissions)
    const items = Array.isArray(data) ? data : (data as any).results
    yield put(fetchSubmissionsSuccess(items))
  } catch { yield put(fetchSubmissionsFailure('Error al cargar envíos.')) }
}

function* handleApprove(action: PayloadAction<number>) {
  try {
    yield call(api.approveSubmission, action.payload)
    yield put(approveSubmissionSuccess(action.payload))
  } catch { yield put(actionFailure('Error al aprobar.')) }
}

function* handleReject(action: PayloadAction<number>) {
  try {
    yield call(api.rejectSubmission, action.payload)
    yield put(rejectSubmissionSuccess(action.payload))
  } catch { yield put(actionFailure('Error al rechazar.')) }
}

export function* adminSaga() {
  yield takeLatest(fetchAdminCoursesRequest.type, handleFetchCourses)
  yield takeLatest(createCourseRequest.type, handleCreateCourse)
  yield takeLatest(updateCourseRequest.type, handleUpdateCourse)
  yield takeLatest(deleteCourseRequest.type, handleDeleteCourse)
  yield takeLatest(fetchSubmissionsRequest.type, handleFetchSubmissions)
  yield takeLatest(approveSubmissionRequest.type, handleApprove)
  yield takeLatest(rejectSubmissionRequest.type, handleReject)
}
