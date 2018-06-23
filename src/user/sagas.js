import { put, call } from "redux-saga/effects";
import { doLoginFail, doLoginSuccess, doRegisterFail, doRegisterSuccess, doNotAuthenticated, doLogoutSuccess, doRefreshToken, doRefreshTokenFail, doRefreshTokenSuccess } from "./actions";
import { API_URL } from "../constants";
import { api } from "../utils/fetch";

export function* login({ username, password, history }){
  const params = {
    url: API_URL + '/token/',
    method: 'POST',
    data: { username, password }
  }
  const { request, response } = yield call(api, params)
  
  if(request.status === 400){
    
    yield put(doLoginFail(Object.values(response.data).map(a=>a[0])))
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
    method: 'POST',
    url: API_URL + '/users/create/',
    data: { username, password, notes:[] }
  }

  const { request, response } = yield call(api, params)
  
  if(request.status !== 200){
    yield put(doRegisterFail(Object.values(response.data).map(a=>a[0])))
  }else{
    yield put(doRegisterSuccess(username))
    yield history.push('/login')
  }
}

export function* checkAuth(action){
  const { data } = yield call(api, { url: API_URL + '/me/', method: 'GET' })
  
  if(data && data.authenticated){
    yield put(doLoginSuccess(data.username))
  }else{
    yield put(doNotAuthenticated())
  }
}

export function* checkExp(action){
  const { data } = yield call(api, { url: API_URL + '/check_exp/', method: 'GET' })
  
  if(data && data.refresh){
    yield put(doRefreshToken())
    const result = yield call(api, { url: API_URL+'/token/refresh/', method:'POST', data:{ token: data.token } })
    
    if(result.request.status === 200){
      yield put(doRefreshTokenSuccess())
    }else{
      yield put(doRefreshTokenFail())
    }
   
  }else if(data.unauthenticated){
    yield put(doNotAuthenticated())
  }
}