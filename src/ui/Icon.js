import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({icon}) => {
  return (
    <i className={`fas fa-${icon}`}></i>
  )
}

Icon.propTypes = {
  icon: PropTypes.string
}

export default Icon
