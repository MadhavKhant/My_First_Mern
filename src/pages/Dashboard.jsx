import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'

const Dashboard = () => {

    const {loading: authLoading} = useSelector((state) => state.auth)
    const {loading: profileLoading} = useSelector((state) => state.profile)

    if(authLoading || profileLoading)
    {
        return (
            <div className='text-center mt-[200px] text-[30px] font-bold text-white'>
                Loading................
            </div>
        )
    }

  return (
    <div className='flex flex-row overflow-auto relative h-full text-white'>
        <Sidebar/>
        
        <div>
            <Outlet/>
        </div>
            
    </div>
  )
}

export default Dashboard
