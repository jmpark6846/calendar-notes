import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import routes from './routes'
import { CHECK_AUTH } from './constants';
import ProtectedRoute from './ProtectedRoute';
import store from './store';


class App extends Component {
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

const mapState = ({user}) => ({ isAuthenticated: user.isAuthenticated })
const mapDispatch = (dispatch) => ({
  checkAuth: () => dispatch({type: CHECK_AUTH})
})
export default connect(mapState, mapDispatch)(App);
