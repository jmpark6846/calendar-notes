import { NOTE_SAVE, NOTE_DELETE } from "../constants";

const initialState = {
  
}

export const noteReducer = (state=initialState, action) => {
  switch(action.type){
    case NOTE_SAVE:
      return {
        ...state,
        [action.payload.date] : { content: action.payload.content }
      }
    case NOTE_DELETE:
      const { [action.payload.date]: value, ...rest} = state
      return { ...rest }
    default: return state
  }
}