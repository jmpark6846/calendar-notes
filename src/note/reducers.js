import { NOTE_SAVE_SUCCESS, NOTE_DELETE, NOTE_SAVE_FAIL, NOTE_SAVE_REQUEST, NOTE_SET, USER_LOGOUT, NOTE_MONTH_REQUEST_SUCCESS, NOTE_MONTH_REQUEST, NOTE_MONTH_REQUEST_FAIL } from "../constants";

const initialState = {
  loading: false,
  saving: false,
  error: false,
  error_msg: '',
  updated: false,
  notes: {}
}

export const noteReducer = (state=initialState, action) => {
  switch(action.type){
    case NOTE_SAVE_REQUEST:
      return{
        ...state,
        saving: true,
        error: false,
      }

    case NOTE_SAVE_SUCCESS:
      return {
        ...state,
        saving: false,
        error: false,
        notes: { 
          ...state.notes, 
          [action.note.date] : action.note
        }
      }

    case NOTE_SAVE_FAIL:
      return {
        ...state,
        saving: false,
        error: true,
      }

    case NOTE_DELETE:
      const { [action.date]: value, ...rest} = state.notes
      return { ...state, notes: { ...rest } }
      
    case NOTE_SET:
      return {
        ...state,
        updated: false
      }

    case NOTE_MONTH_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case NOTE_MONTH_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      }

    case NOTE_MONTH_REQUEST_SUCCESS:
      return {
        ...state,
        notes: { ...state.notes, ...action.notes },
        loading: false,
        error: false,
        updated: true,
      }

    case USER_LOGOUT:
      return initialState
      
    default: return state
  }
}