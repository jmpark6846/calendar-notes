import React from 'react'
import { connect } from 'react-redux'
import { DATE_SELECT } from '../../constants';

const Day = ({date, hasNote, selectDate}) => 
  <div className={"day " + (hasNote ? "has-note" : "")} onClick={()=>selectDate(date)}>
    {date && date.getDate()}
  </div>

export default Day
