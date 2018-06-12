import { calendarReducer, INITIAL_STATE } from "./reducers";
import * as types from '../constants/actionTypes'

describe('calendar reducer', ()=>{
  it('MONTH_UP, MONTH_DOWN 시 저장할 년도와 월으로 store에 저장', () => {
    expect(
      calendarReducer(
        INITIAL_STATE, 
        { type: types.MONTH_DOWN, payload: { year:2018, month: 6 } }
      )
    )
    .toEqual(
      {
        ...INITIAL_STATE, 
        year: 2018, 
        month: 6, 
        notes:[]
      })
  })

  it('캘린더에 표시될 노트 한 달치를 불러오는데 성공하면 노트와 업데이트 플래그를 스토어에 저장', () => {
    expect(
      calendarReducer(
        INITIAL_STATE,
        { type: types.NOTE_MONTH_REQUEST_SUCCESS, payload: { notes: [1,2,3] }}
      )
    )
    .toEqual({
      ...INITIAL_STATE,
      notes: [1,2,3],
      updated: true,
    })
  })
})