import { put, call } from "redux-saga/effects";
import { doNoteMonthRequest, doNoteMonthRequestSuccess, doNoteMonthRequestFail } from "./actions";
import { API_URL } from "../constants";
import { fetchData } from "../utils/fetch";

export function* fetchNoteByMonth(action){
  const { year, month } = action
  const url = `${API_URL}/notes/${year}/${month}/`

  yield put(doNoteMonthRequest())
  const { data, error } = yield call(api, { url, method: 'GET' })
  
  if(error){
    yield put(doNoteMonthRequestFail(error))
  }else{
    yield put(doNoteMonthRequestSuccess(data))
  }
}

