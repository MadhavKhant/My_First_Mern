import React from 'react'
import { IoMdPeople } from "react-icons/io";
import { ImTree } from "react-icons/im";

const CourseCard = ({currentCard, setcurrentCard, cardData}) => {
  return (
    <div  className={`text-richblack-200 bg-richblack-800 w-[500px] h-[250px]
        hover:bg-richblack-5 hover:text-richblack-900 justify-between flex flex-col gap-3 p-4 translate-y-[80px]
          duration-300 transition-all hover:scale-105
    `}  
    style = {{
        
        transition: 'box-shadow 0.3s ease-in-out, transform 0.4s ease-in-out'
    }}

    onMouseEnter={e => {e.currentTarget.style.boxShadow = '10px 15px 10px 0px #E7C009'}}
    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    onClick={() => setcurrentCard(cardData.heading)}
    >

        
            <div className='flex flex-col gap-2'>
                {/* heading     */}
                <div className='text-[25px] font-bold'>
                    {cardData.heading}
                </div>

                {/* para */}
                <div className='text-[16px]'>
                    {cardData.description}
                </div>
            </div>

            {/* Horizontal line */}
            <div className=''>
                <hr className='border-t-2 border-dotted border-gray-300' />
            </div>

            <div className='flex gap-7 justify-between text-[14px]'>
                <div className='flex justify-between items-center gap-3'>
                    <div className='flex justify-between items-center'>
                        <IoMdPeople/>
                    </div>
                    <div className='hover:text-blue-500'>
                        Beginner
                    </div>
                </div>

                <div className='flex gap-3 justify-between items-center'>
                    <div>
                        <ImTree/>
                    </div>
                    <div className='hover:text-blue-500'>
                        6 Lessons
                    </div>
                </div>
            </div>



    </div>
  )
}

export default CourseCard
