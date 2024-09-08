import React, { useEffect, useState } from 'react'
import VideoDetails from '../components/core/viewCourse/VideoDetails'
import { Outlet, useParams } from 'react-router-dom'
import VideoDetailsSidebar from '../components/core/viewCourse/VideoDetailsSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getFullDetailsOfCourse } from '../services/operations/CourseDetails'
import {setCourseSectionData, 
        setEntireCourseData, 
        updateCompleteLecure, 
        setTotalNoofLecture, 
        setCompletedLecture} from '../slices/viewCourseSlice'


const ViewCourse = () => {

  const {courseId} = useParams();
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const x1 = async() => {

      setLoading(true)

      const CourseDetails = await getFullDetailsOfCourse(courseId, token);
      console.log("CourseDetails:::", CourseDetails);

      dispatch(setEntireCourseData(CourseDetails));
      dispatch(setCourseSectionData(CourseDetails.CourseContent));

      let TotalLectures = 0;
      CourseDetails?.CourseContent?.forEach((sec) => {
        TotalLectures += sec.SubSection.length;
      })

      dispatch(setTotalNoofLecture(TotalLectures));

      console.log("allgood:")

      setLoading(false)
    }

    x1();
  }, [])

  if(loading){
    return (
      <div className='spinner'>
        Loading.........
      </div>
    )
  }

  return (
    <>
        <div  className="relative flex min-h-[calc(100vh-3.5rem)]">
            <VideoDetailsSidebar/>
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-6">
                    <Outlet />
                </div>
            </div>
        </div>
    </>
  )
}

export default ViewCourse
