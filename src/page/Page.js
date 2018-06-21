import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CHECK_TOKEN_EXPIRATION } from '../constants';
import Navbar from './Navbar/Navbar'
import Notice from './Notice'

export class Page extends Component {
  static propTypes = {
    errorMsg: PropTypes.string,
    checkTokenExpiration: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.props.checkTokenExpiration()
  }

  render() {
    return (
      <div className="page-default">
        <Navbar />
        <div className="container">
          { this.props.errorMsg && <Notice type='danger' msg='ddd' /> }
          
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStates = ({notes}) => ({
  errorMsg: notes.errorMsg
})

const mapDispatch = (dispatch) => ({
  checkTokenExpiration: () => dispatch({ type: CHECK_TOKEN_EXPIRATION }),
})

export default connect(mapStates, mapDispatch)(Page);