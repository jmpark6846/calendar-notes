import React from 'react'
import PropTypes from 'prop-types'

const Day = ({date, hasNote, selectedDate, today, handleClick}) => 
  <div className={"day" + (+selectedDate === +date ? " selected" : "") + (+today === +date ? " today" : "") + (hasNote ? " has-note" : "") + (date ? " date" : "")} onClick={handleClick(date)}>
    {date && date.getDate()}
  </div>

Day.propTypes = {
  date: PropTypes.object,
  hasNote: PropTypes.bool,
  selectedDate: PropTypes.object,
  today: PropTypes.object,
  handleClick: PropTypes.func,
}

export default Day
