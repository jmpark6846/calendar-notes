import {
  MONTH_DOWN,
  MONTH_UP,
  DATE_SELECT,
  NOTE_MONTH_REQUEST_SUCCESS,
  USER_LOGOUT
} from '../constants/actionTypes'

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()

const today = new Date(year,month,day)

export const INITIAL_STATE = {
  year,
  month,
  today,
  isSundayFirst:false,
  selectedDate: today,
}

export const calendarReducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case MONTH_UP:
    case MONTH_DOWN:
      return {
        ...state,
        month: action.month,
        year: action.year,
      }
    case DATE_SELECT:
      return {
        ...state,
        selectedDate: action.selectedDate
      }
    case USER_LOGOUT:
      return INITIAL_STATE
    default: return state
  }  
}