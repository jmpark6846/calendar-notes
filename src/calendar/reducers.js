import {
  MONTH_DOWN,
  MONTH_UP,
  DATE_SELECT,
} from '../constants'

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()

const today = new Date(year,month,day)

const INITIAL_STATE = {
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
    case DATE_SELECT:
      return {
        ...state,
        ...action.payload
      }
    default: return state
  }  
}