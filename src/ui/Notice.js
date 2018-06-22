import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Notice = ({type, children}) => {
  const classes = classNames('alert',{
    [`alert-${type}`] : type,
  }, 'fade show')
  return (
    <div className={classes} role='alert'>
      {children}
    </div>
  )
}

Notice.propTypes = {
  type: PropTypes.string,
}

export default Notice
