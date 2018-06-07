import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'

import { calendarReducer } from "./calendar/reducers";

const root = combineReducers({
  calendar: calendarReducer,
})

const logger = createLogger()
const store = createStore(root, undefined, applyMiddleware(logger))

export default store
