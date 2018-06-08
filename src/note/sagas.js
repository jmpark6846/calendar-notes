import { takeEvery } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { NOTE_SAVE_ON_SERVER, API_URL } from "../constants";
import { postData, fetchData, getNoteRequestUrl } from "../utils/fetch";
import { doNoteFetch, doNoteRequest, doNoteRequestFail, doNoteRequestSuccess, doNoteSaveRequest, doNoteSaveSuccess, doNoteSaveFail } from "./actions";
import { dateToString } from "../utils/date";

// export function* noteSagas(action){
//   console.log(action)
//   takeEvery(NOTE_SAVE_ON_SERVER, saveNoteOnServer)
// }

export function* save(action){
  yield put(doNoteSaveRequest())
  const {data, error} = yield call(postData, API_URL+'/notes/', action.payload)

  if(!error){
    console.log(data)
    yield put(doNoteSaveSuccess(dateToString(action.payload.date), data.content))
  }else{
    console.log(error)
    yield put(doNoteSaveFail(error))
  }
} 

export function* fetchNote(action){
  yield put(doNoteRequest())
  const url = getNoteRequestUrl(action.payload.date)
  const {data, error} = yield call(fetchData, url)
  
  if(!error){
    console.log(data)
    yield put(doNoteRequestSuccess(dateToString(action.payload.date), data.content))
  }else{
    console.log(error)
    yield put(doNoteRequestFail())
  }
}