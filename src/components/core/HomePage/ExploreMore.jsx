import React from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import { useState } from 'react'
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';



const data = HomePageExplore;

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];


const ExploreMore = () => {

    const [currentTab, setcurrentTab] = useState(tabsName[0]);
    const [courses, setcourses] = useState(data[0].courses);
    const [currentCard, setcurrentCard] = useState(data[0].courses[0].heading);
    
    const setMycard = (val) => {
        setcurrentTab(val);
        const result = data.filter( (ele) => ele.tag === val );
        setcourses(result[0].courses);
        setcurrentCard(result[0].courses[0].heading);
    }

  return (
    <div className='p-10 relative'>
        <div className='flex flex-col justify-center w-full items-center'>

            {/* Text */}
            <div className='flex flex-col gap-3 scale-105 p-5 justify-center items-center'>

                {/* Heading */}
                <div className='text-4xl font-semibold gap-2 flex'>
                    <div className='text-richblack-300'>
                        Unlock the
                    </div>
                    <HighlightText text={"Power of code"} />
                </div>

                {/* Para */}
                <div className='text-richblack-400 text-[15px]'>
                    Learn to Build Anything You Can Imagine
                </div>
            </div>


            {/* All tabs */}
            <div className='rounded-full p-2 gap-2 flex  translate-y-7 w-fit flex-row bg-richblack-700'>
                {
                    tabsName.map((element, index) => {
                        return (
                            <div
                                className={`font-semibold p-3 justify-center transition-all duration-100 rounded-full cursor-pointer hover:scale-95 
                                    hover:bg-richblack-800 flex items-center 
                                    ${currentTab === element ? "text-richblack-5 bg-richblack-900" : "text-richblack-200"}`}
                                key={index}
                                onClick={() => setMycard(element)}
                            >
                                {element}
                            </div>
                        )
                    })
                }
            </div>


            {/* All Cards */}
            <div className='h-[200px] w-[1000px] z-20 '>

                {/* Card */}
                <div className='w-full flex flex-row gap-7 p-5 justify-between ' >
                    {
                        courses.map((ele, index) => {
                            return (
                                <CourseCard 
                                    key = {index}
                                    cardData = {ele}
                                    currentCard = {currentCard}
                                    setcurrentCard = {setcurrentCard}
                                 />
                            )
                        })
                    }
                </div>

            </div>


        </div>
    </div>
  )
}

export default ExploreMore
