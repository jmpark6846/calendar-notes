import React from 'react'
import { Route, Redirect } from "react-router-dom";
import store from './store';
import { connect } from 'react-redux'

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest}) => 
  <Route 
    {...rest} 
    render={props => isAuthenticated ? (
      <Component {...props} />
    ):(
      <Redirect to={{ pathname:'/login', state: { from: props.location } }} /> )}
    />

const mapState = ({user})=>({isAuthenticated: user.isAuthenticated})
export default connect(mapState)(ProtectedRoute)
