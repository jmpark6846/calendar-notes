import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Navbar from './Navbar'
import { CHECK_AUTH, CHECK_TOKEN_EXPIRATION } from '../constants';

export class Page extends Component {
  static propTypes = {
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
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  checkTokenExpiration: () => dispatch({ type: CHECK_TOKEN_EXPIRATION }),
})

export default connect(undefined, mapDispatch)(Page);