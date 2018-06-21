import { CalendarPage, LoginPage, RegisterPage, IndexPage } from '../page';

const routes = [
  {
    path:'/',
    protected:true,
    exact:true,
    component: CalendarPage
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