import { NOTE_SAVE, NOTE_DELETE, NOTE_SAVE_ON_SERVER, NOTE_FETCH } from "../constants";

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

