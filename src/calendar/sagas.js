import { put, call } from "redux-saga/effects";
import { doNoteMonthRequest, doNoteMonthRequestSuccess, doNoteMonthRequestFail } from "./actions";
import { API_URL } from "../constants";
import { fetchData } from "../utils/fetch";

export function* fetchNoteMonth(action){
  const { year, month } = action.payload
  const url = `${API_URL}/notes/${year}/${month}/`
  yield put(doNoteMonthRequest())

  const {data, error} = yield call(fetchData, url)
  
  if(!error){
    const notes = data.map(n => new Date(n.date).getDate())
    
    yield put(doNoteMonthRequestSuccess(notes))
  }else{
    yield put(doNoteMonthRequestFail(error))
  }
}

