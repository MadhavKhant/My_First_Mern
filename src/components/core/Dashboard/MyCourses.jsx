import React, { useEffect, useState } from 'react'
import { VscAdd } from "react-icons/vsc"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import CourseTable from './InstructorCourses/CourseTable';
import { fetchInstructorCourses } from '../../../services/operations/CourseDetails';

const MyCourses = () => {

    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);

    //show instuctor courses on first render
    useEffect(() => {

        console.log("Before courses in MyCourses: ", courses);

        //fetch all courses
        const fetchCourses = async () => {
            setLoading(true);

            const result = await fetchInstructorCourses(token)
            console.log("result from fetchInstructor Courses: ", result);
            if(result){
                setCourses(result)
            }

            setLoading(false);
        }

        fetchCourses();

        console.log("After courses in MyCourses: ", courses);
    },[])

  return (
    <div>
        <div className="mb-14 flex items-center justify-between gap-10 ml-5 mt-10">
            <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
            <buttton onClick={() => navigate("/dashboard/add-course")}
                className='rounded-md px-3 py-2 border-yellow-500 cursor-pointer hover:scale-[90%] hover:bg-yellow-50 transition-all duration-200
                items-center font-bold bg-yellow-300 text-richblack-800 text-md flex gap-2'
            >
                Add Course
                <VscAdd className='font-bold text-lg text-richblack-900'/>
            </buttton>
        </div>

        {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}

export default MyCourses
