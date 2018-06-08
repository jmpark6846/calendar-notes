import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from "redux-saga";

import { createLogger } from 'redux-logger'

import { calendarReducer } from "./calendar/reducers";
import { noteReducer } from './note/reducers';
import { noteSagas, fetchNote, save } from './note/sagas';
import { all, takeEvery } from 'redux-saga/effects';
import { NOTE_SAVE, NOTE_FETCH, NOTE_MONTH_FETCH } from './constants';
import { fetchNoteMonth } from './calendar/sagas';


const root = combineReducers({
  calendar: calendarReducer,
  notes: noteReducer
})

const saga = createSagaMiddleware()

const logger = createLogger()
const store = createStore(root, undefined, applyMiddleware(logger, saga))

function* rootSaga(){
  yield all([
    // ...noteSagas
    takeEvery(NOTE_SAVE, save),
    takeEvery(NOTE_FETCH, fetchNote),
    takeEvery(NOTE_MONTH_FETCH, fetchNoteMonth)
  ])
}

saga.run(rootSaga)

export default store
