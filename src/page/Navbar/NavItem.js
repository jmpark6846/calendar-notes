import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const NavItem = ({value, route, children}) => {
  const to = route ? `/${route}` : `/${value}`
  
  return (
    children ?
      <li className="nav-item">
        {children}
      </li>
      :
      <li className="nav-item">
        <NavLink to={to} className="nav-link">{value}</NavLink>
      </li>     
  )
}

NavItem.propTypes = {
  value: PropTypes.string,
  route: PropTypes.string,
}

export default NavItem
