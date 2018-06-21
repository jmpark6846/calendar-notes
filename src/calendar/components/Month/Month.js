import React from 'react'
import PropTypes from 'prop-types'
import './Month.css'
import { getDaysOfWeek, endDates } from "../../../constants";
import Day from '../Day/DayContainer';

const Month = ({year, month, firstDay, notes, isSundayFirst}) =>
  <div className="month-view">
    <div className="month-header">
      {/* 월 화 수 목 금 토 일 */}
      { getDaysOfWeek(isSundayFirst).map(day=>
          <div key={day} className="day">{day}</div>
      )}
    </div>
    <div className="month-body">
      { new Array(firstDay).fill(null).map((e,idx) => <Day key={idx} />)}
      { new Array(endDates[month]).fill(null).map((e,idx) => 
        <Day 
          key={idx} 
          date={new Date(year,month,idx+1)} 
          hasNote={ notes.includes(idx+1) }
        />)}
      
    </div>
  </div>

Month.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  firstDay: PropTypes.number,
  notes: PropTypes.array,
  isSundayFirst: PropTypes.bool
}

export default Month