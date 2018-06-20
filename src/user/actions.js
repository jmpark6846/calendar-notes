import { USER_LOGIN, USER_LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS, USER_REGISTER, NOT_AUTHENTICATED, LOGOUT_SUCCESS, REFRESH_TOKEN, REFRESH_TOKEN_FAIL, REFRESH_TOKEN_SUCCESS } from "../constants";

export const doUserLogin = (username, password, history) => ({
  type: USER_LOGIN,
  username,
  password,
  history
})

export const doLoginSuccess = (username) => ({
  type: LOGIN_SUCCESS,
  username
})

export const doLoginFail = (error) => ({
  type: LOGIN_FAIL,
  error
})

export const doUserRegister = (username, password, history) => ({
  type: USER_REGISTER,
  username,
  password,
  history
})

export const doRegisterSuccess = (username) => ({
  type: REGISTER_SUCCESS,
  username
})

export const doRegisterFail = (error) => ({
  type: REGISTER_FAIL,
  error
})

export const doUserLogout = (history) => ({
  type: USER_LOGOUT,
  history
})

export const doLogoutSuccess = () => ({
  type: LOGOUT_SUCCESS
})

export const doNotAuthenticated= () => ({
  type: NOT_AUTHENTICATED,
})

export const doRefreshToken = () => ({
  type: REFRESH_TOKEN,
})

export const doRefreshTokenSuccess = () => ({
  type: REFRESH_TOKEN_SUCCESS,
})

export const doRefreshTokenFail = () => ({
  type: REFRESH_TOKEN_FAIL
})