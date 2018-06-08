import { NOTE_SAVE, NOTE_DELETE } from "../constants";

const initialState = {
  loading: false,
  error: false,
  note: {}
}

export const noteReducer = (state=initialState, action) => {
  switch(action.type){
    case NOTE_SAVE:
      return {
        ...state,
        note: { 
          ...state.note, 
          [action.payload.date] : { content: action.payload.content } 
        }
      }
    case NOTE_DELETE:
      const { [action.payload.date]: value, ...rest} = state.note
      return { ...state, note: {...rest } }
    default: return state
  }
}