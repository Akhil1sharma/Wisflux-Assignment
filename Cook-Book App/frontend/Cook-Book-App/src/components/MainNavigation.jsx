import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

export default function MainNavigation({ searchResults, setSearchResults}) {
  return (
   <>
    <Navbar searchResults={searchResults} setSearchResults={setSearchResults} />
    <Outlet/>
    <Footer/>
   </>
  )
}
