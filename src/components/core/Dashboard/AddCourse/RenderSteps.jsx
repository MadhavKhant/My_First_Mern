import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa';
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishCourse from './PublishCourse';

const RenderSteps = () => {

    const {step} = useSelector((state) => state.course);

    const steps = [
        {
            id:1,
            title: "Course Information"
        },
        {
            id:2,
            title: "Course builder"
        },
        {
            id:3,
            title: "Publish"
        }
    ]

  return (
    <div className='flex gap-[50px] flex-col w-fit mx-auto '>

        {/* first Section  */}
        <div className='flex flex-col gap-4 rounded-lg itmes-center justify-center'>
            <div className='flex justify-between gap-[200px] w-full'>
                {
                    steps.map((ele, index) => {
                        return (
                            <div key={index}
                                className={`
                                ${step === ele.id ? "text-yellow-50 bg-yellow-700 border-yellow-50 border-[0.5px] text-semibold px-3 py-1 rounded-full" 
                                :
                                "border-richblack-700 text-white font-bold px-3 rounded-full"}
                                `}
                            >
                            {
                                ele.id < step ? (
                                    <div className='border-[2px] border-yellow-50 bg-yellow-100 rounded-full px-2 py-2'>
                                        <FaCheck className='text-yellow-500 ' />
                                    </div>) 
                                    : (ele.id)
                            }
                            </div>
                        )
                    })
                }
            </div>
            {/* <div className='flex justify-between w-[98%]'>
                {
                    steps.map((ele, index) => {
                        return (
                            <p key={index}>{ele.title}</p>
                        )
                    })
                }
            </div> */}
        </div>


        {step === 1 && <CourseInformationForm/>}
        {step === 2 && <CourseBuilderForm/>}
        {step === 3 && <PublishCourse/>}

    </div>
  )
}

export default RenderSteps
