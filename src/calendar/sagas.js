import { put, call, select } from "redux-saga/effects";
import { doNoteMonthFetch, doNoteMonthRequest, doNoteMonthRequestSuccess, doNoteMonthRequestFail } from "./actions";
import { API_URL } from "../constants";
import { fetchData } from "../utils/fetch";
import { getYMDFromString } from "../utils/date";

export function* fetchNoteMonth(year, month){
  const url = API_URL+'/notes/'
  yield put(doNoteMonthRequest())

  const {data, error} = yield call(fetchData, url)
  const notes = data.map(n => new Date(n.date).getDate())

  if(!error){
    // console.log(notes)
    yield put(doNoteMonthRequestSuccess(notes))
  }else{
    yield put(doNoteMonthRequestFail(error))
  }

}