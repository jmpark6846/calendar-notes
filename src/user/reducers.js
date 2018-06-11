import { USER_LOGIN, USER_LOGOUT, LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_REGISTER } from "../constants";

const INITIAL_STATE = {
  username:'',
  isAuthenticated:false,
  registered:false,
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
        username: action.payload.username,
        isAuthenticated:true,
        error:undefined,
      }
    case LOGIN_FAIL:
      return {
        username:'',
        isAuthenticated:false,
        error:action.payload.error
      }
    case USER_LOGOUT:
      return INITIAL_STATE
    case USER_REGISTER:
      return {
        ...state,
        registered:false,
        error:undefined,
      }
    case REGISTER_FAIL:
      return {
        ...state,
        error:action.payload.error
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        registered:true,
      }
    default: return state
  }
}