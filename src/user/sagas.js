import { put, call, take } from "redux-saga/effects";
import { doLoginRequestFail, doLoginRequestSuccess, doRegisterFail, doRegisterSuccess } from "./actions";
import { API_URL, LOGIN_REQUEST_SUCCESS } from "../constants";
import { postData } from "../utils/fetch";

export function* login(action){
  const url = API_URL + '/token/'
  const {data, error} = yield call(postData, url, action.payload)

  if(error){
    yield put(doLoginRequestFail(error))
  }else{
    yield put(doLoginRequestSuccess(action.payload.username))
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

export function* authPageSaga(){
  while(true){
    yield take(LOGIN_REQUEST_SUCCESS)
  
  }
}