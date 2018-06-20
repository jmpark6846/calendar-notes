import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Day = ({date, hasNote, selectedDate, today, handleClick}) => {
  const classes = classNames('day', {
    'has-note': hasNote,
    'date': date,
    'today': +today === +date,
    'selected': +selectedDate === +date,
  })
  return (
    <div className={classes} onClick={handleClick(date)}>
      {date && date.getDate()}
    </div>
  )
}
  

Day.propTypes = {
  date: PropTypes.object,
  hasNote: PropTypes.bool,
  selectedDate: PropTypes.object,
  today: PropTypes.object,
  handleClick: PropTypes.func,
}

export default Day
