import {
  MONTH_DOWN,
  MONTH_UP,
} from '../constants'

const INITIAL_STATE = {
  year:new Date().getFullYear(),
  month:new Date().getMonth(),
  isSundayFirst:false,
  date: new Date()
}

export const calendarReducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case MONTH_UP:
      return {
        ...state,
        year: action.payload.year,
        month: action.payload.month,
      }
    case MONTH_DOWN:
      return {
        ...state,
        year: action.payload.year,
        month: action.payload.month,
      }
    default: return state
  }  
}