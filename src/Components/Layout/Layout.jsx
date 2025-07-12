import React from 'react'
import Navbar from '../Navbar/Navbar'
import {Outlet} from 'react-router-dom'
export default function Layout() {
  return <>
  
  <Navbar/>

  <div className='container  max-w-7xl py-30 mx-auto'>
<Outlet/>
  </div>

  
  </>
}
