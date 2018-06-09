import { put, call, select } from "redux-saga/effects";
import { doNoteMonthFetch, doNoteMonthRequest, doNoteMonthRequestSuccess, doNoteMonthRequestFail } from "./actions";
import { API_URL } from "../constants";
import { fetchData } from "../utils/fetch";
import { getYMDFromString } from "../utils/date";

export function* fetchNoteMonth(action){
  const { year, month } = action.payload
  const url = `${API_URL}/notes/${year}/${month}/`
  yield put(doNoteMonthRequest())

  const {data, error} = yield call(fetchData, url)

  if(!error){
    const notes = data.map(n => new Date(n.date).getDate())
    // console.log(notes)
    yield put(doNoteMonthRequestSuccess(notes))
  }else{
    console.log(error)
    yield put(doNoteMonthRequestFail(error))
  }

}