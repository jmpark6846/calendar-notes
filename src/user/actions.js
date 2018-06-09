import { USER_LOGIN, USER_LOGOUT, LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAIL, REGISTER_FAIL, REGISTER_SUCCESS, USER_REGISTER } from "../constants";

export const doUserLogin = (username, password) => ({
  type: USER_LOGIN,
  payload:{
    username,
    password
  }
})

export const doLoginRequestSuccess = (username) => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: {
    username
  }
})

export const doLoginRequestFail = (error) => ({
  type: LOGIN_REQUEST_FAIL,
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