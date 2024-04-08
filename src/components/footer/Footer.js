import React from 'react'
import './footer.css'
import {useLocation} from 'react-router-dom'

const Footer = () => {

  const location = useLocation();

  const notAllowedPath = ['/signin']

  
  return (
    <>
    {notAllowedPath.includes(location.pathname)  ? null :
      <footer>Footer</footer>
     }
    </>
  )
}

export default Footer