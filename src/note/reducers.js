import { NOTE_SAVE, NOTE_DELETE, NOTE_REQUEST, NOTE_REQUEST_SUCCESS, NOTE_REQUEST_FAIL } from "../constants";

const initialState = {
  loading: false,
  error: false,
  notes: {}
}

export const noteReducer = (state=initialState, action) => {
  switch(action.type){
    case NOTE_SAVE:
      return {
        ...state,
        notes: { 
          ...state.notes, 
          [action.payload.date] : { content: action.payload.content } 
        }
      }
    case NOTE_DELETE:
      const { [action.payload.date]: value, ...rest} = state.notes
      return { ...state, notes: {...rest } }
    
    case NOTE_REQUEST:
      return {
        ...state,
        loading:true,
      }
    case NOTE_REQUEST_SUCCESS:
      
      return {
        ...state,
        loading:false,
        error:false,
        notes: { 
          ...state.notes, 
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