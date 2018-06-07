import React from 'react'

const Day = ({date, hasNote, selectedDate, today, handleClick}) => 
  <div className={"day" + (+selectedDate === +date ? " selected" : "") + (+today === +date ? " today" : "")} onClick={handleClick(date)}>
    {date && date.getDate()}
  </div>

export default Day
