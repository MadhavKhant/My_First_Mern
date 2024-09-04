import React from 'react'
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { BiEdit } from "react-icons/bi";

const MyProfile = () => {

    const {user} = useSelector((state)=>state.profile);
    


  return (
    <div className='text-white overflow-auto ml-3 w-[1000px] mx-auto absolute z-20 flex flex-col gap-[50px]'>

        {/* Text section */}
        <div className='flex flex-col gap-3 ml-5'>
            <div className='text-richblack-600 flex text-sm'>
                <Link to={"/"} className='hover:text-yellow-50 hover:scale-95'>Home</Link> 
                <span>&nbsp;</span>
                <span> / </span> 
                <span>&nbsp;</span>
                <Link> Dashboard </Link> 
                <span>&nbsp;</span>
                <span> / </span> 
                <span>&nbsp;</span>
                <Link className='text-yellow-200'>My Profile</Link>
                <span>&nbsp;</span>
            </div>
            <p className='text-white text-[34px] font-semibold'>
                My Profile
            </p>
        </div>

            <div className='flex flex-col gap-6'>
                {/* Profile Section */}
                <div className='flex flex-row justify-between items-center px-7 rounded-lg py-5 bg-richblack-800 w-[60%] mx-auto '>
                    <div className='flex flex-row gap-7 items-center'>
                        <img src={user.Image} alt='UserImage' className='w-[80px] h-[80px] rounded-full'/>
                        <div className='flex flex-col gap-1 text-sm '>
                            <span>{user.FirstName} {user.LastName}</span> 
                            <span>{user.Email}</span>
                        </div>
                    </div>
                    <Link to="/dashboard/settings"  className='flex flex-row gap-1 bg-yellow-50 text-black h-fit py-2 px-4 w-fit 
                                rounded-lg items-center'>
                        <BiEdit/>
                        <span className=' font-semibold'>Edit</span>
                    </Link>
                </div>

                {/* PersonalDetails */}
                <div className='w-[60%] rounded-lg flex flex-col py-5 px-7 bg-richblack-800 mx-auto'>
                    <div className='flex flex-row justify-between items-center'>
                        <p className='text-white text-[18px] font-semibold'>Personal Details</p>
                        <Link to="/dashboard/settings"  className='flex flex-row gap-1 bg-yellow-50 text-black h-fit py-2 px-4 w-fit 
                                rounded-lg items-center'>
                            <BiEdit/>
                            <span className=' font-semibold'>Edit</span>
                        </Link>
                    </div>

                    <div className='flex flex-row justify-between mt-8'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2 text-sm '>
                                <p className='text-richblack-600'>FirstName</p>
                                <p className='text-white'>{user.FirstName}</p>
                            </div>

                            <div className='flex flex-col gap-2 text-sm '>
                                <p className='text-richblack-600'>Email</p>
                                <p className='text-white'>{user.Email}</p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2 text-sm '>
                                <p className='text-richblack-600'>LastName</p>
                                <p className='text-white'>{user.LastName}</p>
                            </div>

                            <div className='flex flex-col gap-2 text-sm '>
                                <p className='text-richblack-600'>PhoneNo</p>
                                <p className={` ${user?.PhoneNo ? "" : "text-yellow-200"} text-white`}>{user?.PhoneNo ? user.PhoneNo : "Enter your Phone number"}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        
    </div>
  )
}

export default MyProfile
