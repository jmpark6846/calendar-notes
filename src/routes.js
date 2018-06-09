import React from 'react'
import { CalendarPage, LoginPage, RegisterPage, IndexPage } from './page';

const routes = [
  {
    path:'/',
    exact:true,
    component:()=><IndexPage />
  },
  {
    path:'/calendar',
    component:()=><CalendarPage />
  },
  {
    path:'/login',
    component:()=><LoginPage />
  },
  {
    path:'/register',
    component:()=><RegisterPage />
  },
]

export default routes