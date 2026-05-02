import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import coursesReducer from './slices/coursesSlice'
import submissionsReducer from './slices/submissionsSlice'
import adminReducer from './slices/adminSlice'
import { rootSaga } from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    submissions: submissionsReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
