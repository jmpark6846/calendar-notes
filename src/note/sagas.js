import { put, call } from "redux-saga/effects";
import { API_URL } from "../constants";
import { parseNoteUrl, api } from "../utils/fetch";
import { doNoteRequest, doNoteRequestFail, doNoteRequestSuccess, doNoteSaveRequest, doNoteSaveSuccess, doNoteSaveFail, doNoteDeleteRequest, doNoteDeleteFail, doNoteDeleteSuccess } from "./actions";
import { dateToString } from "../utils/date";

// export function* noteSagas(action){
//   console.log(action)
//   takeEvery(NOTE_SAVE_ON_SERVER, saveNoteOnServer)
// }


export function* save({payload}){
  const { date, content, method } = payload
  let params = { 
    data: { date, content },
    url: method === 'PUT' ? parseNoteUrl(date) : API_URL+'/notes/create/',
    method,
   } 
  
  yield put(doNoteSaveRequest())
  
  const { data, error } = yield call(api, params)

  if(error)
    yield put(doNoteSaveFail(error))
  else
    yield put(doNoteSaveSuccess(dateToString(date), data.content))
} 

export function* deleteNote(action){
  yield put(doNoteDeleteRequest())

  const params = {
    url: parseNoteUrl(action.payload.date),
    method: 'DELETE',
  }

  const { error } = yield call(api, params)

  if(error)    
    yield put(doNoteDeleteFail(error))
  else
    yield put(doNoteDeleteSuccess())
}

export function* fetchNote({ payload }){
  const params = {
    url: parseNoteUrl(payload.date),
    method: 'GET',
  }
  const {data, error} = yield call(api, params)
  
  yield put(doNoteRequest())

  if(error)
    yield put(doNoteRequestFail(error))
  else if(noteDoesNotExist(data))
    yield put(doNoteRequestFail('노트가 존재하지 않습니다.'))
  else
    yield put(doNoteRequestSuccess(dateToString(payload.date), data.content))
}

function noteDoesNotExist(note){
  return note === undefined || !('id' in note) 
}