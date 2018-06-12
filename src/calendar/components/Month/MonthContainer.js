import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import Month from './Month';
import { doNoteMonthFetch } from '../../actions';

class MonthContainer extends React.Component{
  static propTypes = {
    year: PropTypes.number,
    month: PropTypes.number,
    firstDay: PropTypes.number,
    notes: PropTypes.array,
    isSundayFirst: PropTypes.bool,
    fetchMonth: PropTypes.func.isRequired
  }

  constructor(props){
    super(props)
    
    this.getWeekDayInMondayFirst = this.getWeekDayInMondayFirst.bind(this)
    this.getFirstDayOfMonth = this.getFirstDayOfMonth.bind(this)
  }

  componentDidMount = () => {
    this.props.fetchMonth(this.props.year, this.props.month)
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.year !== this.props.year || prevProps.month !== this.props.month){
      this.props.fetchMonth(this.props.year, this.props.month)
    }
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
  fetchMonth: _.debounce((year, month) => dispatch(doNoteMonthFetch(year, month)), 500)
})

export default connect(mapStateToProps,mapDispatchToProps)(MonthContainer)


