import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from "redux-saga";

import { createLogger } from 'redux-logger'

import { calendarReducer } from "./calendar/reducers";
import { noteReducer } from './note/reducers';
import { noteSagas, saveNoteOnServer, fetchNote } from './note/sagas';
import { all, takeEvery } from 'redux-saga/effects';
import { NOTE_SAVE_ON_SERVER, NOTE_FETCH } from './constants';


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
    takeEvery(NOTE_SAVE_ON_SERVER, saveNoteOnServer),
    takeEvery(NOTE_FETCH, fetchNote)
  ])
}

saga.run(rootSaga)

export default store
