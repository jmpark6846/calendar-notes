import { USER_LOGIN, USER_LOGOUT, LOGIN_REQUEST, LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "../constants";

const INITIAL_STATE = {
  username:'',
  isAuthenticated:false,
  error:undefined,
}

export const userReducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case LOGIN_REQUEST_SUCCESS:
      return {
        username: action.payload.username,
        isAuthenticated:true,
        error:undefined,
      }
    case LOGIN_REQUEST_FAIL:
      return {
        username:'',
        isAuthenticated:false,
        error:action.payload.error
      }
    case USER_LOGOUT:
      return INITIAL_STATE
    case REGISTER_FAIL:
      return {
        ...state,
        error:action.payload.error
      }
    case REGISTER_SUCCESS:
      return {
        username: action.payload.username,
        isAuthenticated:true,
        error:undefined,
      }
    default: return state
  }
}