import React from 'react'
import { connect } from 'react-redux'
import Month from './Month';
import { getYMDFromString } from '../../../utils/date';
import { doNoteMonthFetch } from '../../actions';

class MonthContainer extends React.Component{
  constructor(props){
    super(props)
    
    this.getWeekDayInMondayFirst = this.getWeekDayInMondayFirst.bind(this)
    this.getFirstDayOfMonth = this.getFirstDayOfMonth.bind(this)
  }

  componentDidMount = () => {
    this.props.fetchMonth(this.props.year, this.props.month)
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    
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
    return(
      <Month firstDay={firstDay} {...this.props}/>
    )
  }
}

const mapStateToProps = ({calendar}) => ({
  year: calendar.year,
  month: calendar.month,
  isSundayFirst: calendar.isSundayFirst,
  updated: calendar.updated,
  notes: calendar.notes
})

const mapDispatchToProps = (dispatch) => ({
  fetchMonth: (year, month) => dispatch(doNoteMonthFetch(year, month))
})

export default connect(mapStateToProps,mapDispatchToProps)(MonthContainer)