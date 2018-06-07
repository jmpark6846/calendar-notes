import React from 'react'

const MonthPicker = ({year, month, onMonthDown, onMonthUp}) => 
  <div className="month-picker">
    <button onClick={()=>onMonthDown(year, month)}>＜</button>
    <label>{year}년 {month+1}월</label>
    <button onClick={()=>onMonthUp(year, month)}>＞</button>
  </div>

export default MonthPicker