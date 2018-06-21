import React from 'react'
import PropTypes from 'prop-types'
import classNames from "classnames";

const Column = ({className, sm, md, lg, xl, color, children}) => {
  const classes = classNames({ 
    [`col-sm-${sm}`] : sm,
    [`col-md-${md}`] : md,
    [`col-lg-${lg}`] : lg,
    [`col-xl-${xl}`] : xl,
    [`bg-${color}`] : color,
    [className]: className
   })

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

Column.propTypes = {
  className: PropTypes.string,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  color: PropTypes.string
}

export default Column