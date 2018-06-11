import { put, call, take } from "redux-saga/effects";
import { doLoginFail, doLoginSuccess, doRegisterFail, doRegisterSuccess, doNotAuthenticated } from "./actions";
import { API_URL, LOGIN_SUCCESS } from "../constants";
import { postData, fetchData } from "../utils/fetch";

export function* login(action){
  const url = API_URL + '/token/'
  const {data, error} = yield call(postData, url, action.payload)

  if(error){
    yield put(doLoginFail(error))
  }else{
    yield put(doLoginSuccess(action.payload.username))
  }
}

export function* register(action){
  const url = API_URL + '/users/create/'
  const {data, error} = yield call(postData, url, { ...action.payload, notes: [] })

  if(error){
    yield put(doRegisterFail(error))
  }else{
    yield put(doRegisterSuccess(action.payload.username))
  }
}

export function* checkAuth(action){
  const url = API_URL + '/me/'
  const { data } = yield call(fetchData, url)
  
  if(data.isAuthenticated){
    yield put(doLoginSuccess(data.username))
  }else{
    yield put(doNotAuthenticated())
  }
}

export function* authPageSaga(){
  while(true){
    yield take(LOGIN_SUCCESS)
  
  }
}