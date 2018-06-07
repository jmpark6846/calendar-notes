import React from 'react'
import { connect } from 'react-redux'
import Month from './Month';

class MonthContainer extends React.Component{
  constructor(props){
    super(props)
    
    this.getWeekDayInMondayFirst = this.getWeekDayInMondayFirst.bind(this)
    this.getFirstDayOfMonth = this.getFirstDayOfMonth.bind(this)
  }

  getFirstDayOfMonth(){
    const { year, month, isSundayFirst } = this.props
    const day = new Date(year, month, 1).getDay()
    return isSundayFirst ? day : this.getWeekDayInMondayFirst(day)
  }
  
  getWeekDayInMondayFirst(day){
    return day === 0 ? 6 : day-1
  }

  render(){
    const firstDay = this.getFirstDayOfMonth()
    console.log(this.props.notes)
    return(
      
      <Month firstDay={firstDay} {...this.props}/>
    )
  }
}

const mapStateToProps = ({calendar, notes}) => ({
  year: calendar.year,
  month: calendar.month,
  isSundayFirst: calendar.isSundayFirst,
  notes: Object.keys(notes).map(k => Number(k.split('-')[2]))
})

export default connect(mapStateToProps)(MonthContainer)