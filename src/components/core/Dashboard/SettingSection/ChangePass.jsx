import React from 'react'
import { ChangePassword } from '../../../../services/operations/SettingsAPI'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useEffect } from 'react'

const ChangePass = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, reset, handleSubmit, formState:{errors, isSubmitSuccessful}} = useForm();

  const SubmitChangePassForm = async (data) => {
    console.log("data from Changepassform: ", data);
    try{
      const {OldPassword, NewPassword, ConfirmNewPassword} = data;
      const response = dispatch(ChangePassword(OldPassword, NewPassword, ConfirmNewPassword, navigate));
      console.log("response from changepass in submitchangepassform: ", response);
    }
    catch(e){
      console.log("error in changepass form");
      console.log("Error: ", e.message);
      
    }
  }

  useEffect(() => {
    if(isSubmitSuccessful){
        reset({
            OldPassword:"",
            NewPassword:"",
            ConfirmNewPassword:"",
        })
    }
}, [isSubmitSuccessful, reset])

  return (
    <form onSubmit={handleSubmit(SubmitChangePassForm)} className='flex flex-col gap-7 py-5 text-black text-sm'>
        <div className='flex flex-row justify-evenly'>
          <label className='flex flex-col gap-2'>
          <p className='text-richblack-100'>OldPassword</p>
            <input
              type='text'
              name="OldPassword"
              placeholder='Enter OldPassword'
              {...register("OldPassword", {required:true})}
              className='rounded-md bg-richblack-5 py-1 px-1 '
            />
            {errors.OldPassword && <span className='text-white'>{errors.OldPassword.message}</span>}
          </label>

          <label className='flex flex-col gap-2'>
          <p className='text-richblack-100'>NewPassword</p>
            <input
              type='text'
              name="NewPassword"
              placeholder='Enter NewPassword'
              {...register("NewPassword", {required:true})}
              className='rounded-md bg-richblack-5 py-1 px-1 '
            />
            {errors.NewPassword && <span className='text-white'>{errors.NewPassword.message}</span>}
          </label>
        </div>

        <label className='flex flex-col gap-2 w-fit mx-auto'>
          <p className='text-richblack-100'>ConfirmNewPassword</p>
            <input
              type='text'
              name="ConfirmNewPassword"
              placeholder='Enter ConfirmNewPassword'
              {...register("ConfirmNewPassword", {required:true})}
              className='rounded-md bg-richblack-5 py-1 px-1 '
            />
            {errors.ConfirmNewPassword && <span className='text-white'>{errors.ConfirmNewPassword.message}</span>}
          </label>

          <button type='submit' 
            className='text-black hover:text-white hover:bg-yellow-600 py-2 px-3 rounded-lg hover:scale-[90%] transition-all duration-200 bg-yellow-100'>
              Change Password
          </button>
    </form>
  )
}

export default ChangePass
