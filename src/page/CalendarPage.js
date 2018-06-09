import React, { Component } from 'react'
import { Calendar } from "../calendar";
import { Note } from '../note';
import Page from './Page';

const CalendarPage = () =>
  <Page>
    <div className="container">
      <div className="row">
        <div className="col-xl-6">
          <Calendar />
        </div>
        <div className="col-xl-6">
          <Note />
        </div>
      </div>
    </div>
  </Page>
    
export default CalendarPage