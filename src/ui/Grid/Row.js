import React from 'react'
import PropTypes from 'prop-types'

const Row = ({className, children}) => {
  const classes = className ? 'row '+ className : 'row'
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

Row.propTypes = {
  className: PropTypes.string
}

export default Row

