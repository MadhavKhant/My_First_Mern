import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/Images/TimelineImage.png"
import GradiantCircle from './GradiantCircle'

const timeline = [
    {
        Logo: logo1,
        Heading: "LeaderShip",
        Description: "Fully commited to the success compony"
    },
    {
        Logo: logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority"
    },{
        Logo: logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills"
    },{
        Logo: logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution"
    },
];

const TimelineSection = () => {
  return (
    <div className='flex flex-row mx-auto justify-evenly mt-[150px] relative bg-puregreys-25 '>

        {/* LeftPart */}
        <div className='flex flex-col justify-evenly gap-5'>
            {
                timeline.map( (element, index) => {
                    return (

                        <div  className='flex h-[120px] gap-4' key={index}>
                            <div className=' flex flex-col'>
                                <div className='flex justify-center items-center bg-white w-[50px] h-[50px] rounded-full'>
                                    <img className='w-[20px] h-[25px] mx-auto' src={element.Logo} alt={`logo${index + 1}`}/>
                                </div>
                                {
                                    index !== timeline.length - 1 && (
                                    <div className='VerticleDottedLine mx-auto mt-3  h-[40px]'></div>
                                )}
                            </div>

                            {/* Heading and Description */}
                            <div className='flex flex-col items-start gap-1 '>
                                <div className='font-bold text-xl'>
                                    {element.Heading}
                                </div>
                                <div className='text-[14px]'>
                                    {element.Description}
                                </div>
                            </div>
                        </div>
                            
                                             
                    )
                })
            }
        </div>


        <GradiantCircle margin={"ml-[400px]"}/>
        <GradiantCircle margin={"mt-[-80px] ml-[600px]"}/>

        {/* RightPart */}
        <div className='z-20 relative'
            style={{
                boxShadow: '10px 10px 20px 20px #F5F5F5',
            }}
        >
            <img src={TimelineImage} alt='timelineImage' className='w-[700px] h-[600px] '/>
        </div>

        <div className='flex flex-row justify-evenly items-center 
                 pt-[65px] pb-[65px] pl-[10px] pr-[10px] bg-caribbeangreen-700 w-[540px] max-h-[10px] absolute z-20 mt-[520px] ml-[450px] gap-5'>

            <div className='flex gap-5 items-center w-[150px]'>
                <div className='font-bold text-white text-[38px]'>10</div>
                <div className='text-caribbeangreen-400'> 
                    YEARS
                    EXPERIENCE
                </div>
            </div>

            <div className='w-[1px] h-[50px] bg-caribbeangreen-400'></div>
            
            <div className=' flex gap-5 items-center w-[150px]'>
                <div className='font-bold text-white text-[35px]'>250</div>
                <div className='text-caribbeangreen-400'> 
                    TYPES OF COURSES
                </div>
            </div>


        </div>


    </div>
  )
}

export default TimelineSection
