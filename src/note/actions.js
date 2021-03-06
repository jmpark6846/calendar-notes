import { NOTE_MONTH_FETCH, NOTE_MONTH_REQUEST, NOTE_MONTH_REQUEST_SUCCESS,NOTE_SAVE, NOTE_DELETE, NOTE_FETCH, NOTE_REQUEST, NOTE_REQUEST_SUCCESS, NOTE_REQUEST_FAIL, NOTE_SAVE_FAIL, NOTE_SAVE_SUCCESS, NOTE_SAVE_REQUEST, NOTE_SET, NOTE_DELETE_REQUEST, NOTE_DELETE_FAIL, NOTE_DELETE_SUCCESS } from "../constants";

export const doNoteSave = (date, content, method) => ({
  type: NOTE_SAVE,
  date,
  content,
  method
  
})

export const doNoteSaveRequest = (date, content) => ({
  type: NOTE_SAVE_REQUEST,
})

export const doNoteSaveSuccess = (note) => ({
  type: NOTE_SAVE_SUCCESS,
  note
})

export const doNoteSaveFail = (error) => ({
  type: NOTE_SAVE_FAIL,
  error
})

export const doNoteDelete = (date) => ({
  type: NOTE_DELETE,
  date,
})

export const doNoteDeleteRequest = () => ({
  type: NOTE_DELETE_REQUEST,
})


export const doNoteDeleteFail = (error) => ({
  type: NOTE_DELETE_FAIL,
  error,
})

export const doNoteDeleteSuccess = () => ({
  type: NOTE_DELETE_SUCCESS,
})

export const doNoteFetch = (date) => ({
  type: NOTE_FETCH,
  date
})

export const doNoteRequest = () => ({
  type: NOTE_REQUEST,
})

export const doNoteRequestSuccess = (date, content) => ({
  type: NOTE_REQUEST_SUCCESS,
  date,
  content,
})

export const doNoteRequestFail = () => ({
  type: NOTE_REQUEST_FAIL,
})

export const doNoteSet = () => ({
  type: NOTE_SET,
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