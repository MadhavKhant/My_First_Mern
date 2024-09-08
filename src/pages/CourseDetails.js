import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../services/operations/CourseDetails';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../components/common/Error'
import formatDate from '../services/formatDate'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import {buyCourse} from '../services/operations/studentFeaturesAPI'
import LogoutModal from '../components/common/LogoutModal'

const CourseDetails = () => {

    const {courseId} = useParams(); 
    const [courseData, setCourseData] = useState(null);
    const loading = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.profile);
    const [isActive, setIsActive] = useState(Array(0));
    



    useEffect(() => {
        const CourseDetail = async () => {
            try{

                console.log("hello:");
                const result = await fetchCourseDetails(courseId, token);

                console.log("result is: ", result);
                setCourseData(result);
                
            }
            catch(e){
                console.log("Could not fetch course details")
            }
        }

        if(courseId){
            CourseDetail();
        }
        
    },[courseId])
    
    useEffect(() => {
        console.log("Printing CourseDEtails by id: ", courseData);
        let lectures = 0;
        courseData?.data?.CourseContent?.forEach((sec) => {
            lectures += sec.SubSection.length || 0
        })
        setTotalNoOfLectures(lectures);
        
    },[courseData])


    if(!courseData) {
        return (
            <div className='text-white text-center text-[80px]'>
                Loading..................
            </div>
        )
    }

    if(!courseData?.success){
        return (
            <div>
                <Error/>
            </div>
        )
    }

    const handleBuyCourse = () => {
        if(token) {
            console.log("user is: ", user);
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }

        setConfirmationModal({
            text1:"you are not Logged in",
            text2:"Please login to purchase the course",
            btnT1:"Login",
            btnT2:"Cancel",
            btnH1:() => navigate("/login"),
            btnH2:() => setConfirmationModal(null),
        })
    }

    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) ? isActive.concat(id) : isActive.filter((e)=> e !== id)
        )
    }

    const {
        _id: course_id,
        CourseName,
        CourseDescription,
        Thumbnail,
        Price,
        WhatYouWillLearn,
        CourseContent,
        RatingAndReview,
        Instructor,
        StudentsEnrolled,
        createdAt,
        Instructions,
        Category
    } = courseData?.data

  return (
    <div className='flex flex-col  text-white'>
        <div className='relative flex flex-col justify-start p-8'>
            <p>{CourseName}</p>
            <p>{CourseDescription}</p>
            <div className='flex gap-x-2'>
                <span>{`(${StudentsEnrolled.length} students enrolled)`}</span>
            </div>

            <div>
                <p>Created By {`${Instructor.FirstName}`}</p>
            </div>

            <div className='flex gap-x-3'>
                <p>
                    Created At {formatDate(createdAt)}
                </p>
                <p>
                    {" "} English
                </p>
            </div>

            <div>
                <CourseDetailsCard
                    course = {courseData?.data}
                    setConfirmationModal = {setConfirmationModal}
                    handleBuyCourse = {handleBuyCourse}
                />
            </div>

            <div>
                <p> What You WIll learn</p>
                <div>
                    {WhatYouWillLearn}
                </div>
            </div>

            <div>
                <div>
                    <p>Course Content:</p>
                </div>

                <div className='flex gap-x-3 justify-between'>
                    <div>
                        <span>{CourseContent.length} section(s)</span>
                            <span>
                                {totalNoOfLectures} lectures
                            </span>
                    </div>

                        <div>
                            <button
                                onClick={() => setIsActive([])}>
                                Collapse all Sections
                            </button>
                        </div>
                </div>
            </div>
        </div>
        {confirmationModal && <LogoutModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseDetails
