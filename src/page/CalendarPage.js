import React from 'react'
import { Calendar } from "../calendar";
import { Note } from '../note';
import Page from './Page';

const CalendarPage = () =>
  <Page>    
    <div className="row">
      <div className="col-lg-4 col-md-4">
        <Calendar />
      </div>
      <div className="col-lg-8 col-md-8">
        <Note />
      </div>
    </div>
  </Page>
    
export default CalendarPage
