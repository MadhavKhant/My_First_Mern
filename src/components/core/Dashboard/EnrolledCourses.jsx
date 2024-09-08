import React, { useEffect, useState } from 'react'
import {getUserEnrolledCourses} from '../../../services/operations/profileAPI'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar"

const EnrolledCourses = () => {

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getEnrolledCourses = async () => {
      setLoading(true);
      try{
        const result = await getUserEnrolledCourses(token);
        console.log("result: ", result);
        setEnrolledCourses(result)
        setLoading(false);
      }
      catch(e){
        console.log("Could not fetch enroleld courses");
        console.log("error is: ", e);
        setLoading(false);
      }
    }

    getEnrolledCourses();
  },[])

  if(loading){
    return (
      <div className='spinner'>
        Loading...
      </div>
    )
  }


  return (
    <div className='text-white lg:w-[1200px] h-screen px-12 py-12 mb-[150px]'>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>

      {
        !enrolledCourses ? 
        (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
        :
        (
          !enrolledCourses.length ? 
          (
            <p className="grid h-[10vh] w-full place-content-center text-richblack-5"> 
              You have not enrolled in any course yet.
              {/* TODO: Modify this Empty State data not persisting */}
            </p>
          )
          :
          (
            <div className="my-8 text-richblack-5">
              {/* Headings */}
              <div className="flex rounded-t-lg bg-richblack-500 ">
                <p className="w-[45%] px-5 py-3">Course Name</p>
                <p className="w-1/4 px-2 py-3">Duration</p>
                <p className="flex-1 px-2 py-3">Progress</p>
              </div>

              {/* {Course Name} */}
              {
                enrolledCourses.map((course, i, arr) => {
                  return (
                    <div key={i} className={`flex items-center border border-richblack-700 ${
                      i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                    }`}>

                      {/* Image CourseNAme and Course Description */}
                      <div
                        className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                        onClick={() => {
                          navigate(
                            `/view-course/${course?._id}/section/${course.CourseContent?.[0]?._id}/sub-section/${course.CourseContent?.[0]?.SubSection?.[0]?._id}`
                          )
                        }}
                      >
                        <img
                          src={course.Thumbnail}
                          alt="course_img"
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                        <div className="flex max-w-xs flex-col gap-2">
                          <p className="font-semibold">{course.CourseName}</p>
                          <p className="text-xs text-richblack-300">
                            {course.CourseDescription.length > 50
                              ? `${course.CourseDescription.slice(0, 50)}...`
                              : course.CourseDescription}
                          </p>
                        </div>
                      </div>

                      <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
                      <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                        <p>Progress: {course?.progressPercentage || 0}%</p>
                        <ProgressBar
                          completed={course?.progressPercentage || 0}
                          height="8px"
                          isLabelVisible={false}
                        />
                      </div>

                    </div>
                  )
                })
              }
            </div>
          )
        )
      }

    </div>
  )
}

export default EnrolledCourses
