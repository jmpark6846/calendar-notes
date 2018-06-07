import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from "redux-saga";

import { createLogger } from 'redux-logger'

import { calendarReducer } from "./calendar/reducers";
import { noteReducer } from './note/reducers';

const root = combineReducers({
  calendar: calendarReducer,
  notes: noteReducer
})
const saga = createSagaMiddleware()

const logger = createLogger()
const store = createStore(root, undefined, applyMiddleware(logger, saga))

function* rootSaga(){
}

saga.run(rootSaga)

export default store
