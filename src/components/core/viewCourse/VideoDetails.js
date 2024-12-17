import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player, BigPlayButton } from 'video-react';

const VideoDetails = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const dipatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {courseSectionData, totalNoofLecture, courseEntireData} = useSelector((state) => state.viewCourse);
  const playerRef = useRef();
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false)
  const [previewSource, SetPreviewSource] = useState("");



  const isFirstVideo = () => {
    const currentSectionindex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionindex = courseSectionData[currentSectionindex].SubSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionindex === 0 && currentSubSectionindex === 0){
      return true
    }

    return false
  }

  const isLastVideo = () => {
    const currentSectionindex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionindex = courseSectionData[currentSectionindex].SubSection.findIndex(
      (data) => data._id === subSectionId
    )

    const NoofSubSectionLectures = courseSectionData[currentSectionindex].SubSection.length;

    if(currentSectionindex === courseSectionData.length - 1 && currentSubSectionindex === NoofSubSectionLectures - 1){
      return true
    }

    return false
  }

  const goToNextVideo = () => {
    const currentSectionindex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionindex = courseSectionData[currentSectionindex].SubSection.findIndex(
      (data) => data._id === subSectionId
    )
    
    const NoOfSubSection = courseSectionData[currentSectionindex].SubSection.length;

    // forSameSection
    if(currentSubSectionindex !== NoOfSubSection - 1)
    {
      const nextSubSectionId = courseSectionData[currentSectionindex].SubSection[currentSubSectionindex]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else //forNextSection
    {
      const nextSectionId = courseSectionData[currentSectionindex+1]._id;
      const nextSubSectionId = courseSectionData[nextSectionId].SubSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {
    const currentSectionindex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionindex = courseSectionData[currentSectionindex].SubSection.findIndex(
      (data) => data._id === subSectionId
    )
    
    const NoOfSubSection = courseSectionData[currentSectionindex].SubSection.length;

    //for prevSection
    if(currentSectionindex === 0)
    {
      const prevSectionId = courseSectionData[currentSectionindex-1]._id;
      const Sectionlength = courseSectionData[prevSubSectionId].SubSection.length;
      const prevSubSectionId = courseSectionData[prevSubSectionId].SubSection[Sectionlength-1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
    else //for SameSection
    {
      const prevSubSectionId = courseSectionData[currentSectionindex].SubSection[currentSubSectionindex-1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  useEffect(() => {
    const x3 = async () => {
      if(!courseSectionData) return;

      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses")
      }

      setLoading(true)

        const SectionData = courseSectionData.filter((section) => section._id === sectionId);
        
        const FilteredvideoData = SectionData?.[0]?.SubSection.filter((subsection) => subsection._id === subSectionId);
        
        if (!FilteredvideoData) {
          console.error("SubSection not found");
          
          return;
        }

        setVideoData(FilteredvideoData[0]);
        SetPreviewSource(courseEntireData.Thumbnail)
        setVideoEnded(false);

      setLoading(false);
    }

    x3();
  }, [courseEntireData, courseSectionData, location.pathname])
 
  if(loading){
    return (
      <div className='spinner'>
        Loading...
      </div>
    )
  }


  return (
    <div className="flex flex-col gap-5 text-white">
       {
          !videoData ? 
          (
            <img
              src={previewSource}
              alt='preview'
              className="h-full w-full rounded-md object-cover"
            />
          )
          :
          (
            <Player
              className="mt-5 translate-x-[-10%] border-[1.2px] rounded-xl border-richblack-500  translate-y-[-10%] scale-[80%]"
              src={videoData?.VideoUrl}
              ref={playerRef}
              aspectRatio="5:3"
              playsInline
              onEnded={() => setVideoEnded(true)}
            >

              <BigPlayButton position='center'/>

              {/* When Video End */}
              {
                videoEnded && (
                  <div
                    style={{
                        backgroundImage:
                          "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                      }}
                    className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                  >
                    
                    <button 
                            className='hover:scale-[90%] mx-auto mt-2 scale-[175%] transition-all duration-200
                             bg-yellow-300 rounded-md py-2 px-4 text-richblack-800 font-bold'

                             disabled={loading}
                             onClick={() => {
                              if(playerRef?.current){
                                playerRef?.current?.seek(0);
                                setVideoEnded(false)
                              }
                             }}
                    >
                            Rewatch
                    </button>

                    <div className="mt-10 z-[100] inset-0 flex min-w-[250px] justify-center gap-x-4 text-xl ">
                        {
                          !isFirstVideo &&  ( 
                            <button
                              className="bg-white z-50 inset-0 text-white"
                              
                              onClick={goToPrevVideo}
                            >
                                Prev
                            </button>
                          )  
                        }

                        {
                          !isLastVideo() && (
                            <button
                              className=" text-white"
                              disabled={loading}
                              onClick={goToNextVideo}
                            >
                                Next
                            </button>
                          )
                        }
                    </div>

                  </div>
                )
              }


            </Player>

          )
       }

        <div className='flex flex-col gap-2 text-white font-semibold translate-y-[-100%]
         bg-richblack-800 border-[2px] rounded-md border-richblack-100'>
          <h1 className="mt-4 text-3xl font-semibold text-white">{videoData?.Title}</h1>
          <p className="pt-2 pb-6">{videoData?.Description}</p>
        </div>
    </div>
  )
}

export default VideoDetails
