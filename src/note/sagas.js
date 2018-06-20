import { put, call } from "redux-saga/effects";
import { API_URL } from "../constants";
import { postData, fetchData, parseNoteUrl, updateData, api } from "../utils/fetch";
import { doNoteRequest, doNoteRequestFail, doNoteRequestSuccess, doNoteSaveRequest, doNoteSaveSuccess, doNoteSaveFail, doNoteDeleteRequest, doNoteDeleteFail, doNoteDeleteSuccess } from "./actions";
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
    url = parseNoteUrl(action.payload.date)
    api = updateData
  }
  else{
    url = API_URL+'/notes/create/'
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

export function* deleteNote(action){
  yield put(doNoteDeleteRequest())
  const params = {
    url: parseNoteUrl(action.payload.date),
    method: 'DELETE',
  }
  const { error } = yield call(api, params)

  if(error){
    console.log(error)
    yield put(doNoteDeleteFail(error))
  }else{
    yield put(doNoteDeleteSuccess())
  }

}

export function* fetchNote(action){
  yield put(doNoteRequest())
  const url = parseNoteUrl(action.payload.date)
  const {data, error} = yield call(fetchData, url)
  
  if(error){
    yield put(doNoteRequestFail(error))
  }else if(noteDoesNotExist(data)){
    yield put(doNoteRequestFail('노트가 존재하지 않습니다.'))
  }else{
    yield put(doNoteRequestSuccess(dateToString(action.payload.date), data.content))
  }
}

function noteDoesNotExist(note){
  return note === undefined || !('id' in note) 
}