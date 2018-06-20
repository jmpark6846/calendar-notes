import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_REGISTER, NOT_AUTHENTICATED, LOGOUT_SUCCESS } from "../constants";

const INITIAL_STATE = {
  username:'',
  isAuthenticated:undefined,
  error:undefined,
}

export const userReducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case LOGIN_REQUEST:
      return {
        ...state,
        error:undefined,
      }
    case LOGIN_SUCCESS:
      return {
        username: action.username,
        isAuthenticated:true,
        error:undefined,
      }
    case LOGIN_FAIL:
      return {
        username:'',
        isAuthenticated: false,
        error:action.error
      }
    case LOGOUT_SUCCESS:
      return INITIAL_STATE
    case USER_REGISTER:
      return {
        ...state,
        error: undefined,
      }
    case REGISTER_FAIL:
      return {
        ...state,
        error:action.error
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
      }
    case NOT_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
      }
    default: return state
  }
}