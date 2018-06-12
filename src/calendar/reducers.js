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
  updated:false,
  notes:[]
}

export const calendarReducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case MONTH_UP:
    case MONTH_DOWN:
      return {
        ...state,
        ...action.payload,
        notes:[]
      }
    case DATE_SELECT:
      return {
        ...state,
        ...action.payload
      }
    case NOTE_MONTH_REQUEST_SUCCESS:
      return {
        ...state,
        notes:action.payload.notes,
        updated:true,
      }
    case USER_LOGOUT:
      return INITIAL_STATE
    default: return state
  }  
}