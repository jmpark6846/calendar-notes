import { NOTE_SAVE, NOTE_DELETE, NOTE_SAVE_ON_SERVER, NOTE_FETCH, NOTE_REQUEST, NOTE_REQUEST_SUCCESS, NOTE_REQUEST_FAIL } from "../constants";

export const doNoteSave = (date, content) => ({
  type: NOTE_SAVE,
  payload: {
    date,
    content,
  }
})

export const doNoteDelete = (date, content) => ({
  type: NOTE_DELETE,
  payload: {
    date,
  }
})

export const doNoteSaveOnServer = (date, content) => ({
  type: NOTE_SAVE_ON_SERVER,
  payload: {
    date,
    content,
  }
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
