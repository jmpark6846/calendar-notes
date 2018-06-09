import { USER_LOGIN, LOGIN_REQUEST, LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS } from "../constants";

const INITIAL_STATE = {
  username:'',
  isAuthenticated:false,
  error:undefined,
}

export default (state=INITIAL_STATE, action) => {
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
      return {
        username:'',
        isAuthenticated:false,
      }
    default: return state
  }
}