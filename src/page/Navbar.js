import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { doUserLogout } from '../auth';

const activePage = {}

const Navbar = ({username, isAuthenticated, logout}) =>
  <header>
    <nav className="navbar navbar-expand-lg">
      
      <NavLink to="/" className="navbar-brand" activeStyle={activePage}>CalendarNote</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse-menu" aria-controls="navbar-collapse-menu" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbar-collapse-menu">
        <ul className="navbar-nav ml-auto">
          { isAuthenticated ? 
          <React.Fragment>
            <li className="nav-item">
              <NavLink to="/calendar" className="nav-link" activeStyle={activePage}>{username}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeStyle={activePage} onClick={logout} >Logout</NavLink>
            </li>
          </React.Fragment>
          :
          <React.Fragment>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link" activeStyle={activePage}>Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link" activeStyle={activePage}>Login</NavLink>
            </li>
          </React.Fragment>
          }
        </ul>
      </div>
    </nav>  
  </header>

const mapStateToProps = ({auth}) => ({
  username: auth.username,
  isAuthenticated: auth.isAuthenticated,
})

const mapDispatchToProps = (dispatch) => ({
  logout: ()=>dispatch(doUserLogout())
})
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)