import { USER_LOGIN, LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAIL } from "../constants";

export const doUserLogin = (username, password) => ({
  type: USER_LOGIN,
  payload:{
    username,
    password
  }
})

export const doLoginRequest = () => ({
  type: LOGIN_REQUEST,
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


export const doUserLogout = () => ({
  type: USER_LOGOUT,
})