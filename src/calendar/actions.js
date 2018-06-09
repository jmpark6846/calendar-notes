import {
  MONTH_DOWN,
  MONTH_UP,
  NOTE_MONTH_FETCH,
  NOTE_MONTH_REQUEST,
  NOTE_MONTH_REQUEST_SUCCESS,
} from '../constants'

export const doMonthDown = (year, month) => {
  const payload = {
    month: month <= 0 ? 11 : month-1,
    year: month <= 0 ? year-1 : year,
  }
  return {
    type: MONTH_DOWN,
    payload
  }
}

export const doMonthUp = (year, month) => {
  const payload = {
    month: month >= 11 ? 0 : month+1,
    year: month >= 11 ? year+1 : year
  }
  return {
    type:MONTH_UP,
    payload
  }
}

export const  doNoteMonthFetch = (year, month) => ({
  type:NOTE_MONTH_FETCH,
  payload:{
    year, 
    month
  }
})


export const doNoteMonthRequest = () => ({
  type:NOTE_MONTH_REQUEST,
})

export const doNoteMonthRequestSuccess = (notes) => ({
  type:NOTE_MONTH_REQUEST_SUCCESS,
  payload:{
    notes
  }
})

export const doNoteMonthRequestFail = (error) => ({
  type:NOTE_MONTH_REQUEST,
  payload:{
    error
  }
})