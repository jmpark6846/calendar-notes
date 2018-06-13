import React, { Component } from 'react'
import { Calendar } from "../calendar";
import { Note } from '../note';
import Page from './Page';

const CalendarPage = () =>
  <Page>    
    <div className="row">
      <div className="col-xl-4 col-lg-4 col-md-4">
        <Calendar />
      </div>
      <div className="col-xl-8 col-lg-4 col-md-4">
        <Note />
      </div>
    </div>
  </Page>
    
export default CalendarPage
