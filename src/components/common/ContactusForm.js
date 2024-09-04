import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

import { useState } from 'react';
import countrycode from '../../data/countrycode.json'


const ContactusForm = () => {

    const [loading, setLoading] = useState(false);

    const {
        register, 
        reset,
        handleSubmit,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const SubmitContactForm = async (data) => {
        console.log("data from contactusform: ", data);
        try{
            setLoading(true)
            console.log("enterd in contact us form before api hit");
            //const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status: "OK"};
            console.log("Response of contactus form api: ", response);
            setLoading(false)
        }
        catch(e)
        {
            console.log("error in contact us form");
            console.log("Error: ", e.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                Email:"",
                FirstName:"",
                LastName:"",
                PhoneNo: "",
                Message: "",
            })
        }
    }, [isSubmitSuccessful, reset])

    const sortedCountryCodes = [...countrycode].sort((a, b) => a.country.localeCompare(b.country));

  return (
    <form onSubmit={handleSubmit(SubmitContactForm)} className='w-full flex flex-col gap-7'>

        {/* firstname lastname */}
        <div className='flex lg:flex-row flex-col lg:gap-5 gap-3 justify-between mt-5'>
            <label className='flex flex-col w-fit gap-1 text-richblack-50'>
                First Name
                <input
                    type='text'
                    name="FirstName"
                    id="FirstName"
                    placeholder="Enter First Name"
                    style={{
                        boxShadow: '0 2px 4px rgba(255, 255, 255, 0.2)'
                    }}
                    {...register("FirstName", {required:true})}
                    className='bg-richblack-800 p-2 rounded-lg'
                />
                {errors.FirstName && <span className='text-white scale-150'>{errors.FirstName.message}</span>}
            </label>

            <label className='flex flex-col w-fit gap-1 text-richblack-50'>
                Last Name
                <input
                    type='text'
                    name="LastName"
                    id="LastName"
                    placeholder="Enter Last Name"
                    style={{
                        boxShadow: '0 2px 4px rgba(255, 255, 255, 0.2)'
                    }}
                    {...register("LastName", {required:true})}
                    className='bg-richblack-800 p-2 rounded-lg'

                />
                {errors.LastName && <span className='text-white'>{errors.LastName.message}</span>}
            </label>
        </div>

        <label className='flex flex-col gap-2 text-richblack-50'>
            Email
            <input
                type='email'
                name="Email"
                id="Email"
                placeholder='Enter your Email'
                style={{
                        boxShadow: '0 2px 4px rgba(255, 255, 255, 0.2)'
                    }}
                {...register("Email", {required:true})}
                className='bg-richblack-800 p-2 rounded-lg'
            />
            {errors.Email && <span className='text-white'>{errors.Email.message}</span>}
        </label>


        {/* Phone Number */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='phoneNo' className='text-richblack-50'>PhoneNo</label>

            <div className='flex flex-row gap-3'>

            {/* dropDown */}
                <select 
                    id='dropDown' 
                    name='fropDown' 
                    {...register("countrycode", {required: true})} 
                    className='text-richblack-25 bg-richblack-800 w-[50px] rounded-lg'
                    >
                        {
                            sortedCountryCodes.map((ele, index) => {
                                return (
                                    <option 
                                        key={index} 
                                        value={ele.code} 
                                        className={`text-richblack-25 bg-richblack-800 w-[15px] gap-2`}
                                        selected={ele.code === '+91'}
                                    >
                                        {ele.code} --- {ele.country} 
                                    </option>
                                )
                            })
                        }
                </select>

                {/* input phonenumber */}
                <input
                    type='number'
                    id='phoneNo'
                    name='phoneNo'
                    placeholder='0123456789'
                    className='bg-richblack-800 text-richblack-25 w-full p-2 rounded-lg'
                    style={{
                        boxShadow: '0 2px 4px rgba(255, 255, 255, 0.2)'
                    }}
                    {...register("phoneNo", {
                        required:{value: true, message:'please enter phone number'},
                        maxLength: {value:10, message:"invalid phone number"},
                        minLength: {value:8, message:'required atleast 8 number'}
                    })}
                />
                {errors.phoneNo && <span className='text-white'>{errors.phoneNo.message}</span>}
            </div>
        </div>

        {/* message */}
        <label className='flex flex-col gap-2 text-richblack-50'>
            Message
            <textarea
                name="Message"
                id="Message"
                placeholder="Enter your Message"
                style={{
                        boxShadow: '0 2px 4px rgba(255, 255, 255, 0.2)'
                    }}
                {
                    ...register("message", 
                            {
                                required:true,
                            })
                }
                className='bg-richblack-800 p-2 rounded-lg text-center'
                cols="25"
                rows="6"
            />
            {errors.Message && <span className='text-white'>{errors.Message.message}</span>}
        </label>

        <button 
            type='submit'
            className='bg-yellow-200 text-richblack-900 font-semibold p-2 rounded-full hover:scale-[90%] transition-all duration-200'
        >
            Send Message
        </button>
        
    </form>
  )
}

export default ContactusForm
