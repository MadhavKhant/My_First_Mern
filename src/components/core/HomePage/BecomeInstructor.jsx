import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaLongArrowAltRight } from "react-icons/fa";

const BecomeInstructor = () => {
  return (
    <div className='flex flex-row gap-[80px] p-[80px]'>

        {/* Image */}
        <div 
        style={{
                    boxShadow: '-10px -10px 10px 0px #F5F5F5'
                }}
        >
            <img src={Instructor} alt='instrctor_image' className='h-[530px] w-[1300px]'/>
        </div>

        {/* Text */}
        <div className='pt-[100px] pb-[100px]'>
            <div className='flex flex-col items-start justify-between gap-2'>
                <div className='flex flex-col justify-start'>
                    <div className='text-[35px] font-bold text-white'>Become an</div>
                    <div className='text-[35px] font-bold'><HighlightText text={"instructor"}/></div>
                </div>
                
                <div className='text-puregreys-200'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
                <div className='text-white mt-[70px]'>
                    <CTAButton linkto={"\login"} active={true}>
                        <div className='flex items-center gap-3 p-1 text-[16px]'>
                            Start Teaching Today
                            <FaLongArrowAltRight/>
                        </div>
                    </CTAButton>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default BecomeInstructor
