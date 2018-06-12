import React from 'react'
import { Route, Redirect } from "react-router-dom";
import store from './store';
import { connect } from 'react-redux'

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest}) => 
  <Route 
    {...rest} 
    render={ props => {
      if (isAuthenticated === undefined){
        return <div>loading...</div>
      }
      else if(isAuthenticated === false){
        return <Redirect to='/login' />
      }
      else{
        return <Component {...props} />
      }
    }}
  />
    

const mapState = ({user})=>({isAuthenticated: user.isAuthenticated})
export default connect(mapState)(ProtectedRoute)
