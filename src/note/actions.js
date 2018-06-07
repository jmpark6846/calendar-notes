import { NOTE_SAVE } from "../constants";

export const doNoteSave = (date, content) => ({
  type: NOTE_SAVE,
  payload: {
    date,
    content,
  }
})

