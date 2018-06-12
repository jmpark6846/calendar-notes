import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MonthPicker from './MonthPicker';
import { doMonthDown, doMonthUp } from '../../actions';

class MonthPickerContainer extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onMonthDown: PropTypes.func,
    onMonthUp: PropTypes.func,
  }
  
  constructor(props){
    super(props)

    this.state={
      year: this.props.year,
      month: this.props.month,
    }
  }

  render() {
    return (
      <MonthPicker {...this.props} />
    )
  }
}

const mapStateToProps = ({calendar}) => ({
  year: calendar.year,
  month: calendar.month,
})

const mapDispatchToProps = (dispatch) => ({
  onMonthDown: (y, m) => dispatch(doMonthDown(y, m)),
  onMonthUp: (y, m) => dispatch(doMonthUp(y, m)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MonthPickerContainer)