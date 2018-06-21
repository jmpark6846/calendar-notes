import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Notice = ({msg, type}) => {
  const classes = classNames('alert',{
    [`alert-${type}`] : type,
  }, 'fade show') // 'alert-dismissible'
  return (
    <div className={classes} role='alert'>
      {msg}
      {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button> */}
    </div>
  )
}

Notice.propTypes = {
  msg: PropTypes.string,
  type: PropTypes.string,
}

export default Notice
