import React from 'react'
import Day from './Day'


const mapDispatchToProps = (dispatch) => ({
  selectDate: (date) => dispatch({type: DATE_SELECT, payload:{ date }})
})

export default connect(undefined, mapDispatchToProps)(Day)