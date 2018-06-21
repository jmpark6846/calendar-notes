import React from 'react'
import PropTypes from 'prop-types'

const Container = ({fluid, children, className}) => {
  const classes= fluid ? 'container-fulid ' : 'container ' 
  return (
    <div className={classes + className} >
      {children}
    </div>
  )
}

Container.propTypes = {
  fluid: PropTypes.bool,
  className: PropTypes.string,
}

export default Container