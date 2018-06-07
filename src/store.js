import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'

import { calendarReducer } from "./calendar/reducers";
import { noteReducer } from './note/reducers';

const root = combineReducers({
  calendar: calendarReducer,
  notes: noteReducer
})

const logger = createLogger()
const store = createStore(root, undefined, applyMiddleware(logger))

export default store
