import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import PropTypes from "prop-types";
import { doUserLogout } from '../../user/actions';
import './Navbar.css'
import NavItem from './NavItem';

const activePage = {}

const Navbar = ({username, isAuthenticated, logout, history}) =>
  <header>
    <nav className="navbar navbar-expand-lg container-fluid">
      <NavLink to="/" className="navbar-brand">
        CalendarNote
      </NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse-menu" aria-controls="navbar-collapse-menu" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbar-collapse-menu">     
        { isAuthenticated ? 
        <ul className="navbar-nav ml-auto">
          <NavItem value={username} route='calendar' />
          <NavItem>
            <span className="nav-link logout" onClick={()=>logout(history)} >Logout</span>
          </NavItem>
        </ul>
        :
        <ul className="navbar-nav ml-auto">
          <NavItem value='register' />
          <NavItem value='login' />
        </ul>
        }
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