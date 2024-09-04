import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import {logout} from '../../../services/operations/authAPI'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutModal from '../../common/LogoutModal'


const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, loading:profileLoading} = useSelector((state) => state.profile)
    const {loading:authLoading} = useSelector((state) => state.auth)
    const [ConfirmationModal, setConfirmationModal] = useState(null)

    if(profileLoading || authLoading)
    {
        return (
            <div className='text-center mt-[200px] text-[30px] font-bold text-white'>
                Loading................
            </div>
        )
    }

    

  return (
    <div className={` text-white relative`}>
        <div className='flex flex-col text-white gap-3 justify-start py-6 bg-richblack-800 h-screen'>
            {
                sidebarLinks.map((ele, index) => {
                    
                    if((ele?.path !== "/dashboard/my-profile") && ele?.type !== user?.AccountType) 
                    {
                        return null;
                    }

                    return (
                        <SidebarLink key={ele.id} path={ele.path} icon={ele.icon} name={ele.name} />
                    )
                })
            }

            {/* horizontal line */}
            <span className='w-[90%] mx-auto h-[0.1px] bg-richblack-100'></span>

            {/* settings and logout */}
            <div className='flex flex-col'>
                <SidebarLink path="dashboard/settings" name="Settings" icon="VscSettingsGear"/>
                <button
                    onClick={() => setConfirmationModal({
                        text1: "Are you Sure ?",
                        text2: "You will be logged out of your Account",
                        btnT1: "Logout",
                        btnT2: "Cancle",
                        btnH1: () => dispatch(logout(navigate)),
                        btnH2: () => setConfirmationModal(null)
                    })}

                    className='text-white font-semibold hover:scale-[90%] 
                        hover:border-2 hover:border-richblack-500 rounded-lg hover:bg-black py-2 '
                >
                    Logout
                </button>
            </div>
        </div>

        {
            ConfirmationModal && <LogoutModal modalData={ConfirmationModal} />
        }
    </div>
  )
}

export default Sidebar
