import React from 'react'
import Month from './Month/MonthContainer';
import MonthPicker from './MonthPicker/MonthPickerContainer';
import './Calendar.css'

const Calendar = () => 
  <div className="calendar">
    <MonthPicker />
    <Month />
  </div>

export default Calendar