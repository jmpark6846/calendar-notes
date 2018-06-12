import React from 'react'
import PropTypes from "prop-types";
import Navbar from './Navbar'

const Page = ({children}) => 
  <div className="page-default">
    <Navbar />
    <div className="container">
      {children}
    </div>
  </div>

Page.propTypes = {
  children: PropTypes.element.isRequired
}

export default Page