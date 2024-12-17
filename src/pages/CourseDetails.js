import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../services/operations/CourseDetails';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../components/common/Error'
import formatDate from '../services/formatDate'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import {buyCourse} from '../services/operations/studentFeaturesAPI'
import LogoutModal from '../components/common/LogoutModal'
import Footer from '../components/common/Footer';
//import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import ReactMarkdown from 'react-markdown'

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
                const result = await fetchCourseDetails(courseId, token);
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
        let lectures = 0;
        courseData?.data?.CourseContent?.forEach((sec) => {
            lectures += sec.SubSection.length || 0
        })
        setTotalNoOfLectures(lectures);
        
    },[courseData])


    if(!courseData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner">Loading.....</div>
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
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }

        setConfirmationModal({
            text1:"you are not Logged in ",
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
        <>
            {/* Section 1 */}
            <div className='relative w-full flex flex-row justify-between gap-2 px-[10%] py-8 bg-richblack-800'>

                {/* Detail section */}
                <div>
                    <p className='text-5xl text-white'>
                        {CourseName}
                    </p>

                    <p className='text-md text-richblack-500'>
                        {CourseDescription}
                    </p>

                    <p className='text-md text-richblack-5'>
                        Created by <span>{Instructor.FirstName}  {Instructor.LastName}</span>
                    </p>

                    <p className='flex gap-x-2 text-white'>
                        <span>{`(${StudentsEnrolled.length} students enrolled)`}</span>
                    </p>

                    <div className='text-md text-richblack-5 items-center flex flex-row gap-2'>
                        <BiInfoCircle/>
                        <p>
                            createdAt {formatDate(createdAt)}
                        </p>

                        <HiOutlineGlobeAlt/>
                    </div>
                    
                    <p  className='text-md text-richblack-5'>
                        English
                    </p>
                </div>
            </div>

            <div className='bg-richblack-700 ml-[5%] mb-[3%] mt-[1%] w-fit py-4 px-6 justify-center flex rounded-3xl'>
                <CourseDetailsCard
                    course = {courseData?.data}
                    setConfirmationModal = {setConfirmationModal}
                    handleBuyCourse = {handleBuyCourse}
                />
            </div>

            <Footer/>
            {confirmationModal && <LogoutModal modalData={confirmationModal}/>}

        </>
    )
}

export default CourseDetails











// {/* <div className={`relative w-full bg-richblack-800`}>
    
// {/* Hero Section */}
// <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
//   <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
//     <div className="relative block max-h-[30rem] lg:hidden">
//       <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
//       <img
//         src={Thumbnail}
//         alt="course thumbnail"
//         className="aspect-auto w-full"
//       />
//     </div>
//     <div
//       className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
//     >

//       <div>
//         <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
//           {CourseName}
//         </p>
//       </div>
//       <p className={`text-richblack-200`}>{CourseDescription}</p>
//       {/* <div className="text-md flex flex-wrap items-center gap-2">
//         <span className="text-yellow-25">{avgReviewCount}</span>
//         <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
//         <span>{`(${ratingAndReviews.length} reviews)`}</span>
//         <span>{`${studentsEnrolled.length} students enrolled`}</span>
//       </div> */}
//       <div>
//         <p className="">
//           Created By {`${Instructor.FirstName} ${Instructor.LastName}`}
//         </p>
//       </div>
//       <div className="flex flex-wrap gap-5 text-lg">
//         <p className="flex items-center gap-2">
//           {" "}
//           <BiInfoCircle /> Created at {formatDate(createdAt)}
//         </p>
//         <p className="flex items-center gap-2">
//           {" "}
//           <HiOutlineGlobeAlt /> English
//         </p>
//       </div>
//     </div>
//     <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
//       <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
//         Rs. {Price}
//       </p>
//       <button className="yellowButton" onClick={handleBuyCourse}>
//         Buy Now
//       </button>
//       <button className="blackButton">Add to Cart</button>
//     </div>
//   </div>
//   {/* Courses Card */}
//   <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
//     <CourseDetailsCard
//       course = {courseData?.data}
//       setConfirmationModal={setConfirmationModal}
//       handleBuyCourse={handleBuyCourse}
//     />
//   </div>
// </div>
// </div>
// <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
// <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
//   {/* What will you learn section */}
//   <div className="my-8 border border-richblack-600 p-8">
//     <p className="text-3xl font-semibold">What you'll learn</p>
//     <div className="mt-5">
//       <ReactMarkdown>{WhatYouWillLearn}</ReactMarkdown>
//     </div>
//   </div>

//   {/* Course Content Section */}
//   <div className="max-w-[830px] ">
//     <div className="flex flex-col gap-3">
//       <p className="text-[28px] font-semibold">Course Content</p>
//       <div className="flex flex-wrap justify-between gap-2">
//         <div className="flex gap-2">
//           <span>
//             {CourseContent.length} {`section(s)`}
//           </span>
//           <span>
//             {totalNoOfLectures} {`lecture(s)`}
//           </span>
//           {/* <span>{response.data?.totalDuration} total length</span> */}
//         </div>
//         <div>
//           <button
//             className="text-yellow-25"
//             onClick={() => setIsActive([])}
//           >
//             Collapse all sections
//           </button>
//         </div>
//       </div>
//     </div>

//     {/* Course Details Accordion */}
//     {/* <div className="py-4">
//       {courseContent?.map((course, index) => (
//         <CourseAccordionBar
//           course={course}
//           key={index}
//           isActive={isActive}
//           handleActive={handleActive}
//         />
//       ))}
//     </div> */}

//     {/* Author Details */}
//     <div className="mb-12 py-4">
//       <p className="text-[28px] font-semibold">Author</p>
//       <div className="flex items-center gap-4 py-4">
//         <img
//           src={
//             Instructor.image
//               ? Instructor.image
//               : `https://api.dicebear.com/5.x/initials/svg?seed=${Instructor.FirstName} ${Instructor.LastName}`
//           }
//           alt="Author"
//           className="h-14 w-14 rounded-full object-cover"
//         />
//         <p className="text-lg">{`${Instructor.FirstName} ${Instructor.LastName}`}</p>
//       </div>
//       {/* <p className="text-richblack-50">
//         {Instructor?.AdditionalDetails?.about}
//       </p> */}
//     </div>
//   </div>
// </div>
// </div>
// <Footer />
// {confirmationModal && <LogoutModal  modalData={confirmationModal} />}
// </>
// ) */}
