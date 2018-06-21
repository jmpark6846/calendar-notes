import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CHECK_TOKEN_EXPIRATION, INIT_ERROR_MSG } from '../constants';
import Navbar from '../ui/Navbar/Navbar'
import Container from '../ui/Grid/Container';

export class Page extends Component {
  static propTypes = {
    checkTokenExpiration: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.props.checkTokenExpiration()
    this.props.initErrorMsg()
  }

  render() {
    return (
      <div className="page-default">
        <Navbar />
        <Container>
          {this.props.children}
        </Container>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  checkTokenExpiration: () => dispatch({ type: CHECK_TOKEN_EXPIRATION }),
  initErrorMsg: () => dispatch({ type: INIT_ERROR_MSG }),
})

export default connect(undefined, mapDispatch)(Page);