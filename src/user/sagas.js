import { put, call } from "redux-saga/effects";
import { doLoginRequest, doLoginRequestFail, doLoginRequestSuccess } from "./actions";
import { API_URL } from "../constants";
import { postData } from "../utils/fetch";

export function* login(action){
  yield put(doLoginRequest())
  const url = API_URL + '/token/'
  const {data, error} = yield call(postData, url, action.payload)

  if(error){
    console.log(error)
    yield put(doLoginRequestFail(error))
  }else{
    console.log(data)
    yield put(doLoginRequestSuccess(action.payload.username))
  }
}