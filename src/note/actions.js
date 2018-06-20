import { NOTE_SAVE, NOTE_DELETE, NOTE_FETCH, NOTE_REQUEST, NOTE_REQUEST_SUCCESS, NOTE_REQUEST_FAIL, NOTE_SAVE_FAIL, NOTE_SAVE_SUCCESS, NOTE_SAVE_REQUEST, NOTE_SET, NOTE_DELETE_REQUEST, NOTE_DELETE_FAIL, NOTE_DELETE_SUCCESS } from "../constants";

export const doNoteSave = (date, content, method) => ({
  type: NOTE_SAVE,
  payload: {
    date,
    content,
    method
  }
})

export const doNoteSaveRequest = (date, content) => ({
  type: NOTE_SAVE_REQUEST,
})

export const doNoteSaveSuccess = (date, content) => ({
  type: NOTE_SAVE_SUCCESS,
  payload: {
    date,
    content,
  }
})

export const doNoteSaveFail = (error) => ({
  type: NOTE_SAVE_FAIL,
  payload: {
    error
  }
})

export const doNoteDelete = (date) => ({
  type: NOTE_DELETE,
  payload: {
    date,
  }
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
  payload:{
    date
  }
})

export const doNoteRequest = () => ({
  type: NOTE_REQUEST,
})

export const doNoteRequestSuccess = (date, content) => ({
  type: NOTE_REQUEST_SUCCESS,
  payload: {
    date,
    content,
  }
})

export const doNoteRequestFail = () => ({
  type: NOTE_REQUEST_FAIL,
})


export const doNoteSet = () => ({
  type: NOTE_SET,
})