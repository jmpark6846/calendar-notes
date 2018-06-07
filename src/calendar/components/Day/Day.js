import React from 'react'

const Day = ({date, hasNote, selectDate}) => 
  <div className={"day " + (hasNote ? "has-note" : "")}>
    {date && date.getDate()}
  </div>

export default Day
