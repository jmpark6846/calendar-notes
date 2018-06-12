import { put, call, take } from "redux-saga/effects";
import { doLoginFail, doLoginSuccess, doRegisterFail, doRegisterSuccess, doNotAuthenticated, doLogoutSuccess } from "./actions";
import { API_URL, LOGIN_SUCCESS } from "../constants";
import { postData, fetchData } from "../utils/fetch";

export function* login(action){
  const url = API_URL + '/token/'
  const {username, password} = action.payload
  const {data, error} = yield call(postData, url, { username, password })

  if(error){
    yield put(doLoginFail(error))
  }else{
    yield put(doLoginSuccess(action.payload.username))
    yield action.payload.history.push('/calendar')
  }
}


export function* logout(action){
  const url = API_URL + '/logout/'
  yield call(fetchData, url) 
  yield put(doLogoutSuccess())
  yield action.payload.history.push('/')
}


export function* register(action){
  const url = API_URL + '/users/create/'
  const {username, password} = action.payload
  const {data, error} = yield call(postData, url, { username, password, notes: [] })

  if(error){
    yield put(doRegisterFail(error))
  }else{
    yield put(doRegisterSuccess(action.payload.username))
    yield action.payload.history.push('/login')
  }
}


export function* checkAuth(action){
  const url = API_URL + '/me/'
  const { data } = yield call(fetchData, url)
  

  if(data && data.isAuthenticated){
    yield put(doLoginSuccess(data.username))
  }else{
    yield put(doNotAuthenticated())
  }
}