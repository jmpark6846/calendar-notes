import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from "redux-saga";
import { createLogger } from 'redux-logger'
import { calendarReducer } from "./calendar/reducers";
import { noteReducer } from './note/reducers';
import { fetchNote, save, deleteNote } from './note/sagas';
import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { NOTE_SAVE, NOTE_FETCH, NOTE_MONTH_FETCH, USER_LOGIN, USER_REGISTER, CHECK_AUTH, USER_LOGOUT, NOTE_DELETE, CHECK_TOKEN_EXPIRATION } from './constants';
import { fetchByMonth } from './note/sagas';
import { login, register, checkAuth, logout, checkExp } from './user/sagas';
import { userReducer } from './user/reducers';

const root = combineReducers({
  calendar: calendarReducer,
  notes: noteReducer,
  user: userReducer,
})

let store=null
const saga = createSagaMiddleware()

if(process.env.NODE_ENV === 'development'){
  store = createStore(root, undefined, applyMiddleware(saga, createLogger()))  
}else{  
  store = createStore(root, undefined, applyMiddleware(saga))  
}

function* rootSaga(){
  yield all([
    // ...noteSagas
    takeLatest(NOTE_SAVE, save),
    takeLatest(NOTE_DELETE, deleteNote),
    takeLatest(NOTE_FETCH, fetchNote),
    takeLatest(NOTE_MONTH_FETCH, fetchByMonth),
    takeEvery(USER_LOGIN, login),
    takeEvery(USER_LOGOUT, logout),
    takeEvery(USER_REGISTER, register),
    takeEvery(CHECK_AUTH, checkAuth),
    takeEvery(CHECK_TOKEN_EXPIRATION, checkExp),
  ])
}

saga.run(rootSaga)

export default store
