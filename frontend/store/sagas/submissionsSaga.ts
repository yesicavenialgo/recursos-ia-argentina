import { call, put, takeLatest } from 'redux-saga/effects'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as api from '@/lib/api'
import type { Submission } from '@/lib/types'
import {
  createSubmissionRequest, createSubmissionSuccess, createSubmissionFailure,
} from '../slices/submissionsSlice'

function* handleCreateSubmission(action: PayloadAction<Omit<Submission, 'id' | 'status' | 'submitted_at'>>) {
  try {
    yield call(api.createSubmission, action.payload)
    yield put(createSubmissionSuccess())
  } catch {
    yield put(createSubmissionFailure('Error al enviar la sugerencia. Intentá de nuevo.'))
  }
}

export function* submissionsSaga() {
  yield takeLatest(createSubmissionRequest.type, handleCreateSubmission)
}
