import React from 'react'
import Navbar from '../navbar/Navbar'
import {Outlet} from 'react-router-dom'
import Footer from '../footer/Footer'

const AppTemplate = () => {
  return (
    <>
    <Navbar/>
    <main style={{
      width: "100%",
      minHeight : "84vh"
    }}>
     <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default AppTemplate