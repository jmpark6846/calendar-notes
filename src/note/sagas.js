import { takeEvery } from "redux-saga";
import { put, call, select } from "redux-saga/effects";
import { NOTE_SAVE_ON_SERVER, API_URL } from "../constants";
import { postData, fetchData, getNoteRequestUrl, updateData } from "../utils/fetch";
import { doNoteFetch, doNoteRequest, doNoteRequestFail, doNoteRequestSuccess, doNoteSaveRequest, doNoteSaveSuccess, doNoteSaveFail } from "./actions";
import { dateToString } from "../utils/date";

// export function* noteSagas(action){
//   console.log(action)
//   takeEvery(NOTE_SAVE_ON_SERVER, saveNoteOnServer)
// }
export function* save(action){
  let url = ''
  let api = null
  const date = dateToString(action.payload.date)
  yield put(doNoteSaveRequest())
  
  if(action.payload.method === 'update'){
    url = getNoteRequestUrl(action.payload.date)
    api = updateData
  }
  else{
    url = API_URL+'/notes/'
    api = postData
  }
  
  const { data, error } = yield call(api, url, action.payload)

  if(!error){
    console.log(data)
    yield put(doNoteSaveSuccess(date, data.content))
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