import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from "redux-saga";
// import { createLogger } from 'redux-logger'
import { calendarReducer } from "./calendar/reducers";
import { noteReducer } from './note/reducers';
import { fetchNote, save } from './note/sagas';
import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { NOTE_SAVE, NOTE_FETCH, NOTE_MONTH_FETCH, USER_LOGIN, USER_REGISTER, CHECK_AUTH, USER_LOGOUT } from './constants';
import { fetchNoteMonth } from './calendar/sagas';
import { login, register, checkAuth, logout } from './user/sagas';
import { userReducer } from './user/reducers';

const root = combineReducers({
  calendar: calendarReducer,
  notes: noteReducer,
  user: userReducer,
})

// const logger = createLogger()
const saga = createSagaMiddleware()
// const store = createStore(root, undefined, applyMiddleware(saga, logger))
const store = createStore(root, undefined, applyMiddleware(saga))

function* rootSaga(){
  yield all([
    // ...noteSagas
    takeLatest(NOTE_SAVE, save),
    takeEvery(NOTE_FETCH, fetchNote),
    takeEvery(NOTE_MONTH_FETCH, fetchNoteMonth),
    takeEvery(USER_LOGIN, login),
    takeEvery(USER_LOGOUT, logout),
    takeEvery(USER_REGISTER, register),
    takeEvery(CHECK_AUTH, checkAuth)
  ])
}

saga.run(rootSaga)

export default store
