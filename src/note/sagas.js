import { takeEvery } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { API_URL } from "../constants";
import { postData, fetchData, getNoteRequestUrl, updateData } from "../utils/fetch";
import { doNoteRequest, doNoteRequestFail, doNoteRequestSuccess, doNoteSaveRequest, doNoteSaveSuccess, doNoteSaveFail } from "./actions";
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
  
  if(noteDoesNotExist(data)){
    yield put(doNoteRequestFail('노트가 존재하지 않습니다.'))
  }else if(error){
    yield put(doNoteRequestFail(error))
  }else{
    yield put(doNoteRequestSuccess(dateToString(action.payload.date), data.content))
  }
}

function noteDoesNotExist(note){
  return !('id' in note)
}