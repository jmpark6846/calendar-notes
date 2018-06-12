import React, { Component } from 'react'
import { Calendar } from "../calendar";
import { Note } from '../note';
import Page from './Page';

const CalendarPage = () =>
  <Page>    
    <div className="row">
      <div className="col-xl-4">
        <Calendar />
      </div>
      <div className="col-xl-8">
        <Note />
      </div>
    </div>
  </Page>
    
export default CalendarPage
