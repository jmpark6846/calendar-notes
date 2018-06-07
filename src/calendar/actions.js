import {
  MONTH_DOWN,
  MONTH_UP,
  DATE_SELECT,
  DATE_SET
} from '../../constants'

export const doMonthDown = (year, month) => {
  let payload = {
    month: month <= 0 ? 11 : month-1,
    year: month <= 0 ? year-1 : year,
  }
  return {
    type: MONTH_DOWN,
    payload
  }
}

export const doMonthUp = (year, month) => {
  let payload = {
    month: month >= 11 ? 0 : month+1,
    year: month >= 11 ? year+1 : year
  }
  return {
    type:MONTH_UP,
    payload
  }
}

export const doDateSet = (date) => ({
  type: DATE_SET,
  payload: { date }
})