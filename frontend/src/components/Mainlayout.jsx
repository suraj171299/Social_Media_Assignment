import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Mainlayout = () => {
  return (
    <div>
        <Sidebar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Mainlayout