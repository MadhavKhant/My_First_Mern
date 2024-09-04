import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/Button'



const data = [
    {
        order: -1,
        heading1: "World-Class Learning for",
        heading2: "Anyone, Anywhere",
        content: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide."
    },

    {
        order:1,
        heading1:"Curriculum Based",
        heading2: "on Industry Needs",
        content:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },

    { 
        order:2,
        heading1:"Our learing",
        heading2:"method",
        content:"The learning process uses the namely online and offline."
    },

    {
        order:3,
        heading1:"Certification",
        heading2:"",
        content:"You will get a certificate that can be used as a certification during job hunting."
    },

    {
        order:4,
        heading1:"Rating",
        headding2:"\"Auto-grading\"",
        content:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
    },


    {
        order:5,
        heading1:"Ready to",
        heading2:"Work",
        content:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
    }
]



const LearningGrid = () => {

    

  return (
    <div className='grid mx-auto lg:grid-cols-4 grid-cols-1 mb-10 gap-3 px-[8%]'>
        {
            data.map((card, index) => {
                return (
                    <div
                    className={`
                        ${index===0 && "lg:col-span-2 bg-transparent" }
                        ${card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
                        ${card.order === 3 && "lg:col-start-2"}
                        rounded-xl hover:scale-[90%] transition-all duration-200 hover:cursor-pointer
                    `}
                    >

                        {
                            card.order < 0 ? 
                            (
                                <div className='w-fit gap-3 flex flex-col items-start'>
                                    <div className='flex flex-col  items-start text-[33px] font-semibold'>
                                        <p>
                                            {card.heading1}
                                        </p>
                                        <p>
                                            <HighlightText text={card.heading2}/>
                                        </p>
                                    </div>

                                    <p className='text-richblack-200 text-[16px]'>
                                        {card.content}
                                    </p>

                                    
                                    <CTAButton active={true} linkto={"/signup"}>
                                        Learn More
                                    </CTAButton>
                                    
                                </div>
                            ) : 
                            (

                                <div className='flex flex-col px-6 py-7 w-fit gap-5  '>
                                    <div className='flex flex-col items-start text-richblack-5 text-[20px]'>
                                        <p>
                                            {card.heading1}
                                        </p>

                                        <p>
                                            {card.heading2}
                                        </p>
                                    </div>

                                    <p className='text-richblack-200 text-[16px]'>
                                        {card.content}
                                    </p>

                                </div>
                                
                            )
                        }

                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid
