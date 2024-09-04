import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRef } from 'react';
import CourseCard from './CourseCard';



const CourseSlider = ({Courses}) => {


  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    if (Courses) {
      setCourseList(Courses);
    }
  }, [Courses]);

  return (
    <div className=''>
      {
        courseList.length === 0 ? 
        (
          <p className='text-white text-[25px]'>
            No Course Found
          </p>
        ) 
        : 
        (
          <div className='text-white'>
          
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper w-[40%] "
            >

              {
                courseList.map((Course, index) => (
                    <SwiperSlide key={index} className='mx-auto  bg-richblack-900 '>
                      <div className='w-[80%] mx-auto ml-[15%] mb-5 mt-5'>
                        <CourseCard Course={Course} />
                      </div>
                    </SwiperSlide>
                  ))
              }

            </Swiper>
          </div>
        )
        
      }
    </div>
  )
}

export default CourseSlider
