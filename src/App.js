import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import routes from './routes'
import { CHECK_AUTH } from './constants';


class App extends Component {
  componentDidMount = () => {
    this.props.checkAuth()
  }
  
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            { routes.map((route,i)=><Route {...route} key={i} />) }
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
