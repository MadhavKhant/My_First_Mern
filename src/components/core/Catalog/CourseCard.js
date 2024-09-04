import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'




const CourseCard = ({Course}) => {

    // useEffect(()=>{
    //     console.log("Single Course: ", Course);
    // },[])

  return (
    <Link to={`/courses/${Course._id}`}>
      <div className='text-white flex flex-col gap-2 w-fit'>
            <div className=''>
                <img 
                    src={Course?.Thumbnail}
                    alt='course ka thumbnail'
                    className={`h-[300px] w-[400px] rounded-xl object-cover`}
                />
            </div>

            <div className='flex flex-col gap-1 text-white'>
                <p>{Course?.CourseName}</p>
                <p>{Course?.Instructor?.FirstName} {Course?.Instructor?.LastName} </p>
            </div>

      </div>
    </Link>
  )
}

export default CourseCard
