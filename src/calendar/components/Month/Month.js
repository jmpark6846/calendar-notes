import React from 'react'
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
    <hr />
    <div className="month-body">
      { new Array(firstDay).fill(null).map((e,idx) => <Day key={idx} />)}
      { new Array(endDates[month]).fill(null).map((e,idx) => <Day key={idx} date={new Date(year,month,idx+1)} hasNote={ notes.includes(idx+1) } />)}
      
    </div>
  </div>

export default Month