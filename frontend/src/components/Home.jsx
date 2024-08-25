import React, { useEffect } from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import getAllPost from '@/hooks/getAllPost'

const Home = () => {
  getAllPost();
  return (
    <div className='flex'>
        <div className='flex-grow'>
            <Feed/>
            <Outlet/>
        </div>
    </div>
  )
}

export default Home