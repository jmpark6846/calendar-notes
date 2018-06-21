import React from 'react'
import PropTypes from 'prop-types'

const NavMenu = ({id, justify, children}) => {
  const j = justify === 'right' ? 'ml-auto' : 'mr-auto'

  return (
    <div className="collapse navbar-collapse" id={id}>     
      <ul className={"navbar-nav " + j}>
        {children}
      </ul>
    </div>
  )
}

NavMenu.propTypes = {
  id: PropTypes.string.isRequired,
  justify: PropTypes.string,
}

export default NavMenu 
