import { connect } from 'react-redux'
import Day from './Day'
import { DATE_SELECT } from '../../../constants';

const mapStateToProps = ({calendar}) => ({
  today: calendar.today,
  selectedDate: calendar.selectedDate
})

const mapDispatchToProps = (dispatch) => ({
  handleClick: (selectedDate) => dispatch({ type: DATE_SELECT, payload: { selectedDate } })
})

export default connect(mapStateToProps, mapDispatchToProps)(Day)