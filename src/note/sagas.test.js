import { fetchByMonth } from "./sagas";
import { NOTE_MONTH_FETCH, NOTE_MONTH_REQUEST } from "../constants";
import { put, call } from 'redux-saga/effects'
import { doNoteMonthRequestSuccess } from "./actions";
import { api } from "../utils/fetch";

describe('calendar saga', () => {
  it('fetchByMonth 호출', () => {
    const action = { 
      type: NOTE_MONTH_FETCH,
      payload: { year: 2018, month:5 }
    }
    const iterator = fetchByMonth(action)
    
    const url = `http://localhost:3000/api/notes/2018/5/`
    const data = [
      {author: "calendar", content: "가나다", created_date: "2018-06-09T21:20:15.805724+09:00", date: "2018-06-09", id:41, updated_date: null},
      {author: "calendar", content: "일이삼사", created_date: "2018-06-09T21:20:15.805724+09:00", date: "2018-06-10", id:42, updated_date: null},
    ]
    expect(iterator.next().value, put({ type: NOTE_MONTH_REQUEST }))
    expect(iterator.next().value, call(api, { url, method:'GET' }))
    expect(iterator.next({data}).value, put(doNoteMonthRequestSuccess([9,10])))     
  })
})