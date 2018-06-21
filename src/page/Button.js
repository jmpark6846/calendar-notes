import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ icon, children, ...rest}) => {
  return (
    <button className='btn btn-default' type='button' {...rest}>
      { icon && <i className={`fas fa-${icon}`}></i> }
      { children }
    </button>
  )
}

Button.propTypes = {
  icon: PropTypes.string,
}

export default Button
