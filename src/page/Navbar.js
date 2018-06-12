import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import PropTypes from "prop-types";
import { doUserLogout } from '../user/actions';

const activePage = {}

const Navbar = ({username, isAuthenticated, logout, history}) =>
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
              <div href='' className="nav-link" onClick={()=>logout(history)} >Logout</div>
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

Navbar.propTypes={
  username: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object,
}

const mapStateToProps = ({user}) => user

const mapDispatchToProps = (dispatch) => ({
  logout: (history)=>dispatch(doUserLogout(history))
}) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))