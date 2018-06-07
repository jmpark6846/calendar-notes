import { NOTE_SAVE } from "../constants";

const initialState = {
  
}

export const noteReducer = (state=initialState, action) => {
  switch(action.type){
    case NOTE_SAVE:
      return {
        ...state,
        [action.payload.date] : { content: action.payload.content }
      }
    default: return state
  }
}