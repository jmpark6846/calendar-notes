import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import routes from './route/routes'
import ProtectedRoute from './route/ProtectedRoute';
import { CHECK_AUTH } from './constants';

class App extends Component {
  static propTypes = {
    checkAuth: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.props.checkAuth()
  }
  
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            { routes.map((route,i)=> {
            return route.protected ? <ProtectedRoute {...route} key={i}/> : <Route {...route} key={i} />}
          ) }
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  checkAuth: () => dispatch({type: CHECK_AUTH})
})
export default connect(undefined, mapDispatch)(App);
