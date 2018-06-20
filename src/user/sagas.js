import { put, call } from "redux-saga/effects";
import { doLoginFail, doLoginSuccess, doRegisterFail, doRegisterSuccess, doNotAuthenticated, doLogoutSuccess } from "./actions";
import { API_URL } from "../constants";
import { api } from "../utils/fetch";

export function* login({ username, password, history }){
  const params = {
    url: API_URL + '/token/',
    method: 'POST',
    data: { username, password }
  }
  const { error } = yield call(api, params)

  if(error){
    yield put(doLoginFail(error))
  }else{
    yield put(doLoginSuccess(username))
    yield history.push('/calendar')
  }
}


export function* logout({history}){
  const url = API_URL + '/logout/'
  yield call(api, { url }) 
  yield put(doLogoutSuccess())
  yield history.push('/')
}


export function* register({ username, password, history }){
  const params = {
    url: API_URL + '/users/create/',
    data: { username, password }
  }

  const { error } = yield call(api, params)

  if(error){
    yield put(doRegisterFail(error))
  }else{
    yield put(doRegisterSuccess(username))
    yield history.push('/login')
  }
}


export function* checkAuth(action){
  const url = API_URL + '/me/'
  const { data } = yield call(api, { url })
  
  if(data && data.isAuthenticated){
    yield put(doLoginSuccess(data.username))
  }else{
    yield put(doNotAuthenticated())
  }
}