import React from 'react'
import PropTypes from 'prop-types'

const Status = ({condition, text, justify}) => {
  const j = justify === 'right' ? 'ml-auto' : 'mr-auto'

  return (
    condition && <span className={''+j}>{text}</span>
  )
}

Status.propTypes = {

}

export default Status
