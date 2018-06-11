import { USER_LOGIN, USER_LOGOUT, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS, USER_REGISTER, NOT_AUTHENTICATED } from "../constants";

export const doUserLogin = (username, password) => ({
  type: USER_LOGIN,
  payload:{
    username,
    password
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

export const doUserRegister = (username, password) => ({
  type: USER_REGISTER,
  payload:{
    username,
    password
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

export const doUserLogout = () => ({
  type: USER_LOGOUT,
})

export const doNotAuthenticated= () => ({
  type: NOT_AUTHENTICATED,
})
