import { takeEvery } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { NOTE_SAVE_ON_SERVER, API_URL } from "../constants";
import { postData } from "../utils/fetch";

// export function* noteSagas(action){
//   console.log(action)
//   takeEvery(NOTE_SAVE_ON_SERVER, saveNoteOnServer)
// }

export function* saveNoteOnServer(action){
  const {data, error} = yield call(postData, API_URL+'/notes/', action.payload)
  console.log(data)
} 

export function* fetchNote(action){
  console.log('fetchnote')
}