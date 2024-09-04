import React from 'react'
import HighlightText from './HighlightText'
import knowProgress from '../../../assets/Images/Know_your_progress.svg'
import PlanImage from '../../../assets/Images/Plan_your_lessons.svg'
import compareImage from '../../../assets/Images/Compare_with_others.svg'
import CTAButton from './Button'


const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col mt-[120px] justify-center pb-[110px] items-center bg-puregreys-25'>

        {/* Text Section */}
        <div className='flex flex-col gap-3 justify-between w-[620px] scale-110'>
            <div className='text-center mx-auto text-[30px] font-bold'>
                Your swiss knife for <HighlightText text={"learning any language"} />
            </div>
            <div className='text-center mx-auto font-medium'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>
        </div>

        {/* Images */}
        <div className='  w-full mt-[100px] pl-[50px] pr-[50px] bg-puregreys-25'>
            <div className=' ml-[100px] flex mx-auto scale-110'>
                <div className='mr-[50px] w-[600px]' >
                    <img src={knowProgress} alt='knowprogrees'/>
                </div>

                <div className='z-20 ml-[-200px] w-[600px]'>
                    <img src={compareImage} alt='compareImage'/>
                </div>

                <div className='z-30 ml-[-120px] w-[600px]'>
                    <img src={PlanImage} alt='PlanImage'/>
                </div>

            </div>
        </div>


        <div className='mt-[50px] font-bold'>
            <CTAButton linkto={"/signup" } active={true}>
                Learn More
            </CTAButton>
        </div>

    </div>
  )
}

export default LearningLanguageSection
