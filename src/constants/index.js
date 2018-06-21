export const endDates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 매 달 마지막 날짜

export const getDaysOfWeek = (isSundayFirst) => 
  isSundayFirst ?	['일','월','화','수','목','금','토'] : ['월','화','수','목','금','토','일']

// export const API_URL = 'https://calendar-note.herokuapp.com/api'
export const API_URL = 'http://localhost:8000/api'

export const PASSWORD_MIN_LENGTH = 4

export const MAX_LIST_DEPTH = 4
export const PLACEHOLDER_TEXT = '하루를 적어볼까요?'
export * from './actionTypes'