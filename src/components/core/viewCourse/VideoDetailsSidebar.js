import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BsChevronDown } from "react-icons/bs"

export default function VideoDetailsSidebar(){

  const {
    courseSectionData,
    completedLecture,
    courseEntireData,
    totalNoofLecture,
  } = useSelector((state) => state.viewCourse);

  const navigate = useNavigate();
  const {sectionId, subSectionId} = useParams();
  const location = useLocation();
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarStatus, setVideoBarStatus] = useState("");
  

  useEffect(() => {
    const x2 = () => {

      console.log("CourseEntireData: ", courseEntireData)
      console.log("CourseSectionData: ", courseSectionData);
      console.log("completedLecture: ", completedLecture)
      console.log("activeStatus: ", activeStatus);
      console.log("videoBarStatus: ", videoBarStatus);

      if(!courseSectionData.length) return

      // const currentSectionIndex = courseSectionData.findIndex(
      //   (data) => data._id === sectionId
      // )

      // const currentSubSectionIndex = courseEntireData?.[currentSectionIndex]?.SubSection.findIndex(
      //   (data) => data._id === subSectionId
      // )

      setActiveStatus(sectionId);
      setVideoBarStatus(subSectionId);
    }

    x2();

  }, [location.pathname, courseSectionData, courseEntireData])



  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[20%] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          
          <div  className="flex w-full items-center justify-between ">
          
            {/* back button */}
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>

              {/* total lecture */}
            <div className="flex flex-col">
              <p>{courseEntireData?.CourseName}</p>
              <p className="text-sm font-semibold text-richblack-200">
                {completedLecture?.length} / {totalNoofLecture}
              </p>
            </div>
          </div>

            <div className="h-[calc(100vh - 5rem)] overflow-y-auto w-[80%] ">
              {
                courseSectionData.map((section, index) => (
                  <div
                    className="mt-2 cursor-pointer text-sm text-richblack-5"
                    onClick={() => setActiveStatus(section?._id)}
                    key={index}
                  >
                    {/* Section */}
                    <div className="flex flex-row justify-center rounded-lg gap-2 bg-richblack-600 px-5 py-4">

                      <div className=" font-semibold text-center">
                        {section.SectionName}
                      </div>

                      <span
                          className={`
                            ${activeStatus === section._id ? "rotate-0" : "rotate-180"} 
                            transition-all duration-500
                          `}
                      >
                        <BsChevronDown />
                      </span>

                    </div>

                    {/* SubSection */}
                    <div>
                    
                      {
                        activeStatus === section._id && 
                        (
                          <div  className="transition-[height] duration-500 ease-in-out 
                            text-center gap-2 flex flex-col mt-2">
                            {
                              section.SubSection.map((sub, index) => {
                                  return (
                                    <div key={index} 
                                      onClick={() => {
                                        navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${sub?._id}`)
                                        setVideoBarStatus(sub._id)
                                      }}
                                        
                                      className={`${videoBarStatus === sub._id ? 
                                      "bg-yellow-100 text-black " 
                                      : 
                                      ""
                                      }
                                      border-[1.2px] ring-richblack-400 py-2 px-4 rounded-xl
                                      hover:scale-[90%] transition-all duration-200
                                      `}
                                    >
                                      {
                                        sub.Title
                                      }
                                    </div>
                                  )
                              })
                            }
                          </div>
                        )
                      }
                    </div>

                  </div>
                ))
              }
            </div>

        </div>
    </div>
  )
}



                          // <div className="transition-[height] duration-500 ease-in-out">
                          //   {
                          //     section.SubSection.map((ele, index) => {
                          //       <div
                          //         key={index}
                          //         className={`flex gap-3  px-5 py-2 
                          //           ${videoBarStatus === ele._id ? 
                          //             "bg-yellow-200 font-semibold text-richblack-800" 
                          //               : 
                          //             "hover:bg-richblack-900"}`}
                          //         onClick={() => {
                          //           navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${ele?._id}`)
                          //           setVideoBarStatus(ele._id);
                          //         }}
                          //       >

                          //        <input
                          //         type="checkbox"
                          //         checked={completedLecture.includes(ele?._id)}
                          //         onChange={() => {}}
                          //         className='text-white'
                          //       />
                          //         {ele.Title}
                          //       </div>
                          //     })
                          //   }
                          // </div>

 