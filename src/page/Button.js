import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon';

const Button = ({ icon, children, ...rest}) => {
  return (
    <button className='btn btn-default' type='button' {...rest}>
      { icon && <Icon icon={icon} />}
      { children }
    </button>
  )
}

Button.propTypes = {
  icon: PropTypes.string,
}

export default Button
