import React from 'react'
import PropTypes from "prop-types";
import './MonthPicker.css'
const MonthPicker = ({year, month, onMonthDown, onMonthUp}) => 
  <div className="month-picker">
    <button className='btn' onClick={()=>onMonthDown(year, month)}>
      <span class="oi oi-chevron-left"></span>
    </button>
    <label>{year}년 {month+1}월</label>
    <button className='btn' onClick={()=>onMonthUp(year, month)}>
      <span class="oi oi-chevron-right"></span>
    </button>
  </div>

MonthPicker.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  onMonthDown: PropTypes.func,
  onMonthUp: PropTypes.func,
}

export default MonthPicker