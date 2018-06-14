import { USER_LOGIN, USER_LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS, USER_REGISTER, NOT_AUTHENTICATED, LOGOUT_SUCCESS } from "../constants";

export const doUserLogin = (username, password, history) => ({
  type: USER_LOGIN,
  payload:{
    username,
    password,
    history
  }
})

export const doLoginSuccess = (username) => ({
  type: LOGIN_SUCCESS,
  payload: {
    username
  }
})

export const doLoginFail = (error) => ({
  type: LOGIN_FAIL,
  payload: {
    error
  }
})

export const doUserRegister = (username, password, history) => ({
  type: USER_REGISTER,
  payload:{
    username,
    password,
    history
  }
})

export const doRegisterSuccess = (username) => ({
  type: REGISTER_SUCCESS,
  payload: {
    username
  }
})

export const doRegisterFail = (error) => ({
  type: REGISTER_FAIL,
  payload: {
    error
  }
})

export const doUserLogout = (history) => ({
  type: USER_LOGOUT,
  payload:{
    history
  }
})

export const doLogoutSuccess = () => ({
  type: LOGOUT_SUCCESS
})

export const doNotAuthenticated= () => ({
  type: NOT_AUTHENTICATED,
})
