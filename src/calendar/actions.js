import {
  MONTH_DOWN,
  MONTH_UP,
} from '../constants'

export const doMonthDown = (year, month) => ({
  type: MONTH_DOWN,
  month: month <= 0 ? 11 : month-1,
  year: month <= 0 ? year-1 : year,
})

export const doMonthUp = (year, month) => ({
  type:MONTH_UP,
  month: month >= 11 ? 0 : month+1,
  year: month >= 11 ? year+1 : year
})
