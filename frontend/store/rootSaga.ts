import { all } from 'redux-saga/effects'
import { coursesSaga } from './sagas/coursesSaga'
import { submissionsSaga } from './sagas/submissionsSaga'
import { adminSaga } from './sagas/adminSaga'

export function* rootSaga() {
  yield all([coursesSaga(), submissionsSaga(), adminSaga()])
}
