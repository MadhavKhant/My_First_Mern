import React, { useState } from 'react'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { DeleteAccount } from '../../../../services/operations/SettingsAPI';
import LogoutModal from '../../../common/LogoutModal';
import { useDispatch } from 'react-redux';
import ChangePass from './ChangePass';


const Settings = () => {

  const {user} = useSelector((state) => state.profile);
  const [deleteModalData, setDeleteModalData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className='text-white flex flex-col gap-[15px] absolute overflow-auto h-full mx-auto w-screen'>

        {/* Text Section */}
        <div className='flex flex-col mt-2 ml-5  p-2'>
          <div className='flex gap-1 text-richblack-100 items-center translate-x-[-20px]
             hover:bg-richblack-800 w-fit py-2 px-4 hover:scale-[90%] rounded-lg'>
            <MdOutlineKeyboardArrowLeft />
            <button onClick={() => navigate("/dashboard/my-profile")} className='text-richblack-200 text-sm'>Back</button>
          </div>

          <p className='text-[30px] font-semibold text-richblack-25'>
            Edit Profile
          </p>
        </div>

        {/* setting Section */}
        <div className='w-fit ml-[250px] h-fit p-5 gap-7 flex flex-col  mb-[100px]'>

          {/* Change profile picture */}
          <div className='flex py-5 px-7 items-center justify-start bg-richblack-800 rounded-lg gap-7'>
            <img src={user?.Image} alt='User-Image' className='w-[70px] h-[70px] rounded-full'/>
            <div className='flex flex-col gap-2 w-fit h-fit'>
              <p className='text-richblack-25'>Change Profile Picture</p>
              <div className='flex w-fit gap-4'>
                <button className='px-4 py-2 rounded-lg bg-yellow-100 text-black 
                hover:bg-yellow-600 hover:text-white hover:scale-[90%] transition-all duration-200'>
                  Change
                </button>

                <button className='px-4 py-2 rounded-lg hover:scale-[90%] hover:text-white hover:bg-richblack-900 text-richblack-400 bg-richblack-700'>
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className='flex flex-col p-4 bg-richblack-800'>
            <p>Profile Information</p>
          </div>

          {/* Update Password Section */}
          <div className='bg-richblack-800 flex flex-col gap-2 p-3 w-full h-fit rounded-lg'>
            <ChangePass/>
          </div>

          {/* Delete Account */}
          <div className='p-3 gap-3 flex flex-row bg-red-800 rounded-3xl text-sm'>
            <MdDelete className='w-[30px] h-[30px]' />
            <div className='gap-2 flex flex-col'>
              <p className='text-white text-lg'>Delete Account</p>
              <p className='text-red-200'>Whould you like to delete Account?</p>
              <div>
                <p className='text-red-200'>This account conins paid courses. Deleting Account remove all</p>
                <p className='text-red-200'>the contains associated with it</p>
              </div>
              <button className='text-red-500 hover:scale-[90%] hover:bg-black hover:text-white px-4 py-2 rounded-lg'
                onClick={() => setDeleteModalData({
                  text1: "Are you Sure to Delete Account?",
                  text2: "You will be logged out of your Account",
                  btn1Text: "Delete Account",
                  btn2Text: "Cancle",
                  btn1Handler: () => dispatch(DeleteAccount(navigate)),
                  btn2Handler: () => setDeleteModalData(null)
                })}
              >
                I want to delete my Account
              </button>
            </div>
          </div>

        </div>

       
        {deleteModalData && <LogoutModal modalData={deleteModalData} />}
    </div>
  )
}

export default Settings
