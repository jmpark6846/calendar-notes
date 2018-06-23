import { calendarReducer, INITIAL_STATE } from "./reducers";
import * as types from '../constants/actionTypes'

describe('calendar reducer', ()=>{
  it('MONTH_UP, MONTH_DOWN 시 저장할 년도와 월으로 store에 저장', () => {
    expect(
      calendarReducer(
        INITIAL_STATE, 
        { type: types.MONTH_DOWN, year:2018, month: 6 }
      )
    )
    .toEqual(
      {
        ...INITIAL_STATE, 
        year: 2018, 
        month: 6, 
      })
  })

  it('한달 치 노트를 불러오는 액션 생성 ', () => {
    expect(
      calendarReducer(
        INITIAL_STATE,
        { type: types.NOTE_MONTH_REQUEST_SUCCESS, }
      )
    )
    .toEqual({
      ...INITIAL_STATE,
    })
  })
})