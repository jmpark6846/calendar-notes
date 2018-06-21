import React from 'react'
import { Calendar } from "../calendar";
import { Note } from '../note';
import Page from './Page';
import Row from '../ui/Grid/Row';
import Column from '../ui/Grid/Column';

const CalendarPage = () =>
  <Page>    
    <Row>
      <Column lg={4} md={4}>
        <Calendar />
      </Column>
      <Column lg={8} md={8}>
        <Note />
      </Column>
    </Row>
  </Page>
    
export default CalendarPage
