import React from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";


function Layout({children}) {
  return (
      <>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </>
  )
}

export default Layout