import { NOTE_SAVE, NOTE_DELETE } from "../constants";

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