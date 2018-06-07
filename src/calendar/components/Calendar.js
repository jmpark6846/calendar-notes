import React from 'react'
import Month from './Month/';
import MonthPicker from './MonthPicker/';

const Calendar = () => 
  <div className="calendar">
    <MonthPicker />
    <Month />
  </div>

export default Calendar