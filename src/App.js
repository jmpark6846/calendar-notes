import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import routes from './routes'

class App extends Component {
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

export default App;
