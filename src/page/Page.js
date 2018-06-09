import React from 'react'
import Navbar from './Navbar'

const Page = ({children}) => 
  <div className="page-default">
    <Navbar />
    <div className="body mt-4 mb-4">
      {children}
    </div>
  </div>

export default Page