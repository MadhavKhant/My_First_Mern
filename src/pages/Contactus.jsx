import React from 'react'
import ContactFormSection from '../components/common/ContactFormSection'

import { IoChatbubbles } from "react-icons/io5";
import { FaEarthAsia } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import Footer from '../components/common/Footer'

const Contactus = () => {
  return (
    <div>

        {/* section 1 */}
        <div className='w-11/12 flex flex-row gap-5 justify-evenly mx-auto mt-[5%] transition-all duration-200'>
            {/* leftbox */}
            <div className='bg-richblack-800 text-richblack-200 h-fit
                flex flex-col justify-evenly w-fit gap-5 rounded-lg  px-8 py-5 '>
                <div className='flex flex-row gap-1 hover:scale-[90%]
                 hover:bg-richblack-600 p-5 rounded-lg transition-all duration-200'>
                    
                    <IoChatbubbles className='w-[25px] h-[25px] font-bold'/>
                    <div className='flex flex-col items-start'>
                        <p className='text-[16px] text-white font-semibold'>Chat on us</p>
                        <p className='text-[12px]'>Our friendly team is here to help</p>
                        <p className='text-[12px]'>@mail address</p>
                    </div>
                </div>

                <div className='flex flex-row gap-1 hover:scale-[90%]
                 hover:bg-richblack-600 p-5 rounded-lg transition-all duration-200'>
                    
                    <FaEarthAsia className='w-[25px] h-[25px] font-bold'/>
                    <div className='flex flex-col items-start'>
                        <p className='text-[16px] text-white font-semibold'>Visit us</p>
                        <p className='text-[12px]'>Come and say hellow at our office</p>
                        <p className='text-[12px]'>here is location address</p>
                    </div>
                </div>

                <div className='flex flex-row gap-1 hover:scale-[90%]
                 hover:bg-richblack-600 p-5 rounded-lg transition-all duration-200'>
                    
                    <IoMdCall className='w-[25px] h-[25px] font-bold'/>
                    <div className='flex flex-col items-start'>
                        <p className='text-[16px] text-white font-semibold'>Call us</p>
                        <p className='text-[12px]'>Mon-Fri at 8am-5pm</p>
                        <p className='text-[12px]'>+1234567890</p>
                    </div>
                </div>
            </div>

            {/* right */}
            <div className='border-2 rounded-lg border-richblack-600 p-12 w-[45%] h-fit'>
                <ContactFormSection 
                    heading1="Got a Idea? We've got the skills let's teamp up" 
                    heading2="Tell us more about yourself and what you're got in mind."
                />
             </div>

        </div>


        <div className='mt-[5%]'>
            <Footer/>
        </div>
    </div>
  )
}

export default Contactus
