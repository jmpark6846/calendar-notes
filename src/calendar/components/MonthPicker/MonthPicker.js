import React from 'react'
import PropTypes from "prop-types";

const MonthPicker = ({year, month, onMonthDown, onMonthUp}) => 
  <div className="month-picker">
    <button onClick={()=>onMonthDown(year, month)}>＜</button>
    <label>{year}년 {month+1}월</label>
    <button onClick={()=>onMonthUp(year, month)}>＞</button>
  </div>

MonthPicker.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  onMonthDown: PropTypes.func,
  onMonthUp: PropTypes.func,
}

export default MonthPicker