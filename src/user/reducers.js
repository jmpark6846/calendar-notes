import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_REGISTER, NOT_AUTHENTICATED, LOGOUT_SUCCESS, INIT_ERROR_MSG } from "../constants";

const INITIAL_STATE = {
  username:'',
  isAuthenticated:undefined,
  errorMsg:[],
}

export const userReducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case LOGIN_REQUEST:
      return {
        ...state,
        errorMsg:[],
      }
    case LOGIN_SUCCESS:
      return {
        username: action.username,
        isAuthenticated:true,
        errorMsg:[],
      }
    case LOGIN_FAIL:
      return {
        username:'',
        isAuthenticated: false,
        errorMsg:action.error
      }
    case LOGOUT_SUCCESS:
      return {
        ...INITIAL_STATE,
        isAuthenticated: false,
      }
    case USER_REGISTER:
      return {
        ...state,
        errorMsg: [],
      }
    case REGISTER_FAIL:
      return {
        ...state,
        errorMsg:action.error
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
    case INIT_ERROR_MSG:
      return {
        ...state,
        errorMsg:[]
      }
    default: return state
  }
}