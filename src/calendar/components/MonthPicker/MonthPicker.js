import React from 'react'
import PropTypes from "prop-types";
import './MonthPicker.css'

const MonthPicker = ({year, month, onMonthDown, onMonthUp}) => 
  <div className="month-picker">
    <button className='btn btn-light' onClick={()=>onMonthDown(year, month)}>
      〈
    </button>
    <label>{year}년 {month+1}월</label>
    <button className='btn btn-light' onClick={()=>onMonthUp(year, month)}>
      〉    
    </button>
  </div>

MonthPicker.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  onMonthDown: PropTypes.func,
  onMonthUp: PropTypes.func,
}

export default MonthPicker