import React from 'react'
import { CalendarPage, LoginPage, RegisterPage, IndexPage } from '../page';
import store from '../store';

const routes = [
  {
    path:'/',
    exact:true,
    component: IndexPage
  },
  {
    path:'/calendar',
    protected:true,
    component:CalendarPage
  },
  {
    path:'/login',
    component:LoginPage
  },
  {
    path:'/register',
    component:RegisterPage
  },
]

export default routes