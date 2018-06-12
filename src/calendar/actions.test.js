import {
  MONTH_DOWN,
  MONTH_UP,
  NOTE_MONTH_FETCH,
  NOTE_MONTH_REQUEST,
  NOTE_MONTH_REQUEST_SUCCESS,
} from '../constants'

import { doMonthDown, doMonthUp } from './actions'

describe('Month', () => {
  it('2018년 7월에서 6월로 바꾸고 MONTH_DOWN 액션을 생성', () => {
    const action = {
      type: MONTH_DOWN,
      payload:{
        year:2018,
        month:6,
      }
    }
    expect(doMonthDown(2018, 7)).toEqual(action)
  })
  
  it('2018년 12월에서 2019년 1월로 바꾸고 MONTH_UP 액션을 생성', () => {
    const action = {
      type: MONTH_UP,
      payload:{
        year:2019,
        month:0,
      }
    }
    expect(doMonthUp(2018, 11)).toEqual(action)
  })
})