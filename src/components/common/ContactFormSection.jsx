import React from 'react'
import ContactusForm from './ContactusForm'

const ContactFormSection = ({heading1, heading2}) => {
  return (
    <div className='mx-auto bg-transparent '> 

        {/* heading */}
        <div className='flex flex-col gap-2 items-center justify-center'>
            <p className='font-semibold text-[36px] text-richblack-25'>
                {heading1}
            </p>
            <p className='text-[16px] text-richblack-600'>
                {heading2}
            </p>
        </div>

        {/* //form */}
        <div>
            <ContactusForm/>
        </div>
    </div>
  )
}

export default ContactFormSection
