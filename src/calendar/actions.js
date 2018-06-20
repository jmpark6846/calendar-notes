import {
  MONTH_DOWN,
  MONTH_UP,
  NOTE_MONTH_FETCH,
  NOTE_MONTH_REQUEST,
  NOTE_MONTH_REQUEST_SUCCESS,
} from '../constants'

export const doMonthDown = (year, month) => ({
  type: MONTH_DOWN,
  month: month <= 0 ? 11 : month-1,
  year: month <= 0 ? year-1 : year,
})

export const doMonthUp = (year, month) => ({
  type:MONTH_UP,
  month: month >= 11 ? 0 : month+1,
  year: month >= 11 ? year+1 : year
})

export const  doNoteMonthFetch = (year, month) => ({
  type:NOTE_MONTH_FETCH,
  year, 
  month
})


export const doNoteMonthRequest = () => ({
  type:NOTE_MONTH_REQUEST,
})

export const doNoteMonthRequestSuccess = (notes) => ({
  type:NOTE_MONTH_REQUEST_SUCCESS,
  notes
})

export const doNoteMonthRequestFail = (error) => ({
  type:NOTE_MONTH_REQUEST,
  error
})