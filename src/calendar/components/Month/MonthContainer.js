import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import Month from './Month';
import { doNoteMonthFetch } from '../../../note/actions';

class MonthContainer extends React.Component{
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    notes: PropTypes.object,
    isSundayFirst: PropTypes.bool,
    fetchNoteByMonth: PropTypes.func.isRequired
  }

  constructor(props){
    super(props)
    
    this.getWeekDayInMondayFirst = this.getWeekDayInMondayFirst.bind(this)
    this.getFirstDayOfMonth = this.getFirstDayOfMonth.bind(this)
    this.getDaysWithNote = this.getDaysWithNote.bind(this)
  }

  componentDidMount = () => {
    this.props.fetchNoteByMonth(this.props.year, this.props.month)
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.year !== this.props.year || prevProps.month !== this.props.month){
      this.props.fetchNoteByMonth(this.props.year, this.props.month)
    }
  }

  getDaysWithNote(notes){
    return Object.keys(notes)
    .filter(d=>{
      const [year, month, day] = d.split('-')
      return Number(year) === this.props.year && Number(month) === this.props.month+1 ? true : false
    })
    .map(d => parseInt(d.split('-')[2]))
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
    const { year, month, isSundayFirst } = this.props
    const firstDay = this.getFirstDayOfMonth()
    const notes = this.getDaysWithNote(this.props.notes) 
    return(
      <Month firstDay={firstDay} year={year} month={month} isSundayFirst={isSundayFirst} notes={notes} />
    )
  }
}

const mapStateToProps = ({calendar, notes}) => ({
  year: calendar.year,
  month: calendar.month,
  isSundayFirst: calendar.isSundayFirst,
  notes: notes.notes
})

const mapDispatchToProps = (dispatch) => ({
  fetchNoteByMonth: _.debounce((year, month) => dispatch(doNoteMonthFetch(year, month)), 500)
})

export default connect(mapStateToProps,mapDispatchToProps)(MonthContainer)


