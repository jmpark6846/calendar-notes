import React, { Component } from 'react';
import { Calendar } from './calendar';
import { Note } from './note';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xl-6'>
            <Calendar /> 
          </div>
          <div className='col-xl-6'>
            <Note />
          </div>
        </div>
        
        
      </div>
    );
  }
}

export default App;
