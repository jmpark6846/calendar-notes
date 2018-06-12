import React, { Component } from 'react'
import { Calendar } from "../calendar";
import { Note } from '../note';
import Page from './Page';

const CalendarPage = () =>
  <Page>    
    <div className="row">
      <div className="col-xl-4">
        <div className="row">
          <Calendar />
        </div>
      </div>
      <div className="col-xl-8">
        <div className="row">
          <Note />
        </div>
      </div>
    </div>
  </Page>
    
export default CalendarPage
