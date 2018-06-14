import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types'

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
    
ProtectedRoute.propTypes={
  Component: PropTypes.element,
  username: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.string,
}
const mapState = ({user})=>({isAuthenticated: user.isAuthenticated})
export default connect(mapState)(ProtectedRoute)
