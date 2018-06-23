import React from 'react'
import PropTypes from 'prop-types'

const Status = ({condition, text, justify}) => {
  const j = justify === 'right' ? 'ml-auto' : 'mr-auto'

  return (
    condition && <span className={''+j}>{text}</span>
  )
}

Status.propTypes = {
  condition: PropTypes.bool,
  text: PropTypes.string,
  justify: PropTypes.string,
}

export default Status
