import { put, call } from "redux-saga/effects";
import { API_URL } from "../constants";
import { parseNoteUrl, api } from "../utils/fetch";
import { doNoteMonthRequest, doNoteMonthRequestSuccess, doNoteMonthRequestFail, doNoteRequest, doNoteRequestFail, doNoteRequestSuccess, doNoteSaveRequest, doNoteSaveSuccess, doNoteSaveFail, doNoteDeleteRequest, doNoteDeleteFail, doNoteDeleteSuccess } from "./actions";
import { dateToString } from "../utils/date";

// export function* noteSagas(action){
//   console.log(action)
//   takeEvery(NOTE_SAVE_ON_SERVER, saveNoteOnServer)
// }

export function* fetchByMonth(action){
  const { year, month } = action
  const url = `${API_URL}/notes/${year}/${month}/`
  let notes = {}
  yield put(doNoteMonthRequest())
  const { data, error } = yield call(api, { url, method: 'GET' })
  
  if(error){
    yield put(doNoteMonthRequestFail(error))
  }else{
    data.forEach(e=>{ notes[e.date] = e })
    yield put(doNoteMonthRequestSuccess(notes))
  }
}


export function* save({ date, content, method }){
  let params = { 
    data: { date, content },
    url: method === 'PUT' ? parseNoteUrl(date) : API_URL+'/notes/create/',
    method,
   } 
  
  yield put(doNoteSaveRequest())
  
  const { data, error } = yield call(api, params)

  if(error)
    yield put(doNoteSaveFail(error))
  else{
    yield put(doNoteSaveSuccess(data))
  }
} 

export function* deleteNote({date}){
  const params = {
    url: parseNoteUrl(date),
    method: 'DELETE',
  }

  yield put(doNoteDeleteRequest())
  const { error } = yield call(api, params)

  if(error)    
    yield put(doNoteDeleteFail(error))
  else
    yield put(doNoteDeleteSuccess())
}

export function* fetchNote({ date }){
  const params = {
    url: parseNoteUrl(date),
    method: 'GET',
  }
  const { data, error } = yield call(api, params)
  
  yield put(doNoteRequest())

  if(error)
    yield put(doNoteRequestFail(error))
  else if(noteDoesNotExist(data))
    yield put(doNoteRequestFail('노트가 존재하지 않습니다.'))
  else
    yield put(doNoteRequestSuccess(dateToString(date), data.content))
}

function noteDoesNotExist(note){
  return note === undefined || !('id' in note) 
}