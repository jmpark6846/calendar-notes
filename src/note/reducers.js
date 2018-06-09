import { NOTE_SAVE_SUCCESS, NOTE_DELETE, NOTE_REQUEST, NOTE_REQUEST_SUCCESS, NOTE_REQUEST_FAIL, NOTE_SAVE_FAIL, NOTE_SAVE_REQUEST, NOTE_SET, USER_LOGOUT } from "../constants";

const initialState = {
  loading: false,
  saving: false,
  error: false,
  updated: false,
  notes: {}
}

export const noteReducer = (state=initialState, action) => {
  switch(action.type){
    case NOTE_SAVE_REQUEST:
      return{
        ...state,
        saving:true,
        error:false,
      }
    case NOTE_SAVE_SUCCESS:
      return {
        ...state,
        saving:false,
        error:false,
        notes: { 
          ...state.notes, 
          [action.payload.date] : { content: action.payload.content } 
        }
      }
    case NOTE_SAVE_FAIL:
      return {
        ...state,
        saving:false,
        error:true,
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
        updated:true,
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
    case NOTE_SET:
      return {
        ...state,
        updated:false
      }
    case USER_LOGOUT:
      return initialState
    default: return state
  }
}