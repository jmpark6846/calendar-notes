import { NOTE_SAVE, NOTE_DELETE, NOTE_REQUEST, NOTE_REQUEST_SUCCESS, NOTE_REQUEST_FAIL } from "../constants";

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
    
    case NOTE_REQUEST:
      return {
        ...state,
        loading:true,
      }
    case NOTE_REQUEST_SUCCESS:
      return {
        ...state,
        loading:true,
        error:false,
        note: { 
          ...state.note, 
          [action.payload.date] : { content: action.payload.content } 
        }
      }
    case NOTE_REQUEST_FAIL:
      return {
        ...state,
        loading:false,
        error:true,
      }
    default: return state
  }
}