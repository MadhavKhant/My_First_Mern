import React, { useEffect } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import formatDate from '../../../../services/formatDate'
import { COURSE_STATUS } from '../../../../utils/constants'
import LogoutModal from '../../../common/LogoutModal'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/CourseDetails'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';



const CourseTable = ({courses, setCourses}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const TRUNCATE_LENGTH = 30

    const handleCourseDelete = async (courseId) => {
        setLoading(true)
        const deleteCourseData = await deleteCourse({ courseId: courseId }, token)
        const result = await fetchInstructorCourses(token)
        if (result) {
          setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
      }



  return (
    <div>
      <Table className="rounded-lg  w-full ">
        <Thead >
            <Tr className="flex gap-x-10 px-6 py-2 justify-evenly text-[20px]" >
                <Th className="text-left text-[20px] uppercase text-richblack-100">Courses</Th>
                <Th className="text-left text-[20px] ml-12 uppercase text-richblack-100">Duration</Th>
                <Th className="text-left text-[20px] uppercase text-richblack-100">Price</Th>
                <Th className="text-left text-[20px] uppercase text-richblack-100">Actions</Th>
            </Tr>
        </Thead>

        <Tbody className='w-full'>
            {
                courses.length === 0 ? 
                (
                    <Tr>
                        <Td>
                            <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                No courses found
                                {/* TODO: Need to change this state */}
                            </Td>
                        </Td>
                    </Tr>
                ) 
                : 
                (
                    courses.map((course) => {
                        return (
                            <Tr key={course._id} className='flex gap-x-10  px-6 py-8 '>
                                <Td>
                                    <img
                                        src={course?.Thumbnail}
                                        alt={course?.CourseName}
                                        className="h-[200px] w-[250px] rounded-lg object-cover"
                                    />

                                <div className="flex flex-col justify-between">
                                    <p className="text-lg font-semibold text-richblack-5 mt-2">
                                        {course.CourseName}
                                    </p>

                                    <p className="text-xs text-richblack-300">
                                        {
                                            course.CourseDescription.split(" ").length > TRUNCATE_LENGTH ? 
                                                course.CourseDescription
                                                .split(" ")
                                                .slice(0, TRUNCATE_LENGTH)
                                                .join(" ") + "..."
                                            :   course.CourseDescription
                                        }
                                    </p>

                                    <p className="text-[12px] text-white">
                                        Created: {formatDate(course.createdAt)}
                                    </p>

                                    {
                                        course.Status === COURSE_STATUS.DRAFT ? 
                                        (
                                            <p className="flex w-fit flex-row items-center mt-1 gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                <HiClock size={14} />
                                                Drafted
                                            </p>
                                        ) 
                                            : 
                                        (
                                        <p className="flex mt-1 w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                <FaCheck size={8} />
                                            </div>
                                            Published
                                        </p>
                                        )
                                    }
                                </div>
                                </Td>

                                <Td className="text-sm font-medium text-richblack-100">
                                    2hr 30min
                                </Td>

                                <Td className="text-sm font-medium ml-[80px] text-richblack-100">
                                    ₹{course.Price}
                                </Td>

                                {/* Edit and Delete icon */}
                                <Td className="text-sm font-medium ml-[80px] gap-x-10
                                      text-richblack-100 ">
                                    
                                    {/* Edit  Course*/}
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                        navigate(`/dashboard/UpdateCourse/${course._id}`)
                                        }}
                                        title="Edit"
                                        className="px-2 
                                            transition-all duration-200 hover:scale-110 
                                            hover:text-caribbeangreen-300"
                                    >
                                        <FiEdit2 size={20} />
                                    </button>

                                    {/* Delete Course */}
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Do you want to delete this course?",
                                                text2: "All the data related to this course will be deleted",
                                                btnT1: !loading ? "Delete" : "Loading...  ",
                                                btnT2: "Cancel",
                                                btnH1: !loading ? () => handleCourseDelete(course._id) : () => {},
                                                btnH2: !loading ? () => setConfirmationModal(null) : () => {},
                                            })
                                        }}
                                        title="Delete"
                                        className="px-1 
                                            transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                    </Td>                                
                            </Tr>
                        )
                    })
                )
            }
        </Tbody>

      </Table>
      {confirmationModal && <LogoutModal modalData={confirmationModal} />}
    </div>
  )
}

export default CourseTable
