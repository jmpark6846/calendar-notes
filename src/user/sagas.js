import { put, call } from "redux-saga/effects";
import { doLoginFail, doLoginSuccess, doRegisterFail, doRegisterSuccess, doNotAuthenticated, doLogoutSuccess, doRefreshToken, doRefreshTokenFail } from "./actions";
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
  yield call(api, { url, method:'GET' }) 
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
  const { data } = yield call(api, { url, method: 'GET' })
  
  if(data && data.authenticated){
    if(data.refresh){
      yield put(doRefreshToken())
      const result = yield call(api, { url: API_URL+'/token/refresh/', method:'POST', data:{ token: data.token } })
      if(result){
        yield put(doLoginSuccess(data.username))
      }else{
        yield put(doRefreshTokenFail())
      }
    }
    else
      yield put(doLoginSuccess(data.username))
  }else{
    yield put(doNotAuthenticated())
  }
}