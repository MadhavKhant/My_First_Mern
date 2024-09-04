import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import HighlightText2 from '../components/core/HomePage/HighlightText2'
import HighlightText3 from '../components/core/HomePage/HighlightText3'
import image1 from '../assets/Images/aboutus1.webp'
import image2 from '../assets/Images/aboutus2.webp'
import image3 from '../assets/Images/aboutus3.webp'
import foundingImage from '../assets/Images/FoundingStory.png'
import GradiantCirclePink from '../components/core/HomePage/GradiantCirclePink'
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import LearningGrid from '../components/core/AboutUs/LearningGrid'
import Footer from '../components/common/Footer'
import ContactFormSection from '../components/common/ContactFormSection'



const Aboutus = () => {
  return (
    <div className='text-white flex flex-col items-center justify-center bg-richblack-900'>

        {/* Section1 */}
        <div className='flex h-[500px] relative  flex-col items-center justify-center bg-richblack-800 w-[90%] gap-10'>

            <div className='text-richblack-300  text-center flex justify-center items-center scale-125'>
                About Us
            </div>

            <div className='flex flex-col gap-6 items-center w-full scale-125'>
                <div className='text-[29px] flex flex-col items-center'>
                    <p>Driving Innovation in Online Education for a</p>
                    <HighlightText text={"Brighter Future"} />
                </div>
                <p className='text-richblack-300 text-[13px] w-[45%] text-center'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
            </div>

            <div className='absolute gap-3 flex flex-row lg:opacity-100 opacity-0 items-center mx-auto lg:scale-[85%] mt-[70%] scale-[60%] lg:mt-[50%]'>
                <img src={image1} alt='aboutusImage1' />
                <img src={image2} alt='aboutusImage2' />
                <img src={image3} alt='aboutusImage3' />
            </div>
            
        </div>{/*Section 1 */}

        <div className='mt-[280px] scale-110 font-semibold mx-auto flex flex-col items-center justify-center'>
            <p className='flex gap-2 text-center text-[28px] text-richblack-100'>
                
            <RiDoubleQuotesL/> We are passionate about revolutionizing the way we learn. Our 
            </p>
            <p className=' text-center text-[28px] text-richblack-100'>
                innovation platform <HighlightText text="combines technology"/> , <HighlightText2 text="expertise"/>, and community to 
            </p>
            <p className='gap-2 flex text-center text-[28px] text-richblack-100'>
                create an <HighlightText2 text="unparalleled educational experience."/>
                <RiDoubleQuotesR/>
            </p>
        </div>

        {/* Horizontal line */}
        <div className='h-[1px] bg-richblack-700 w-full mt-[80px]'></div>

        <div className='flex flex-row gap-x-12 w-[80%] mt-[120px] justify-evenly'>
            {/* left */}
            <div className='flex flex-col gap-5 items-start w-[40%] text-richblack-300'>
                <p  className='text-[33px]'>
                    <HighlightText3 text="Our Founding Story"  />
                </p>

                <p>
                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                </p>

                <p>
                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                </p>
            </div>

            {/* right image */}
            <div className='relative'>
                <img src={foundingImage} alt='Founding-story-image' className='relative z-30'/>
                <div className='scale-[90%] absolute mt-[-350px] ml-[-80px] z-20'>
                    <GradiantCirclePink/>
                </div>
            </div>
        </div>


        <div className='flex flex-row w-[80%] justify-evenly items-center mx-auto gap-7 mt-[150px]'>
            <div className='flex flex-col gap-1 items-start justify-evenly w-[40%]'>
                <div className='text-[32px]'>
                    <HighlightText2 text="Our Vision" />
                </div>

                <p className='text-richblack-300'>
                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                </p>
            </div>

            <div className='flex flex-col gap-1 items-start justify-evenly w-[40%]'>
                <div className='text-[32px]'>
                    <HighlightText text="Our Mission" />
                </div>

                <p className='text-richblack-300'>
                    our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.    
                </p>
            </div>
            
        </div>


        <div className='w-full h-[200px] flex flex-row items-center justify-evenly gap-4 bg-richblack-800 mt-[80px]'>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-richblack-25 text-[30px] font-bold' >
                    5K
                </p>
                <p className='text-richblack-500'>
                    Active Students
                </p>
            </div>

            <div className='flex flex-col items-center justify-center'>
                <p className='text-richblack-25 text-[30px] font-bold' >
                    10+
                </p>
                <p className='text-richblack-500'>
                    Mentors
                </p>
            </div>

            <div className='flex flex-col items-center justify-center'>
                <p className='text-richblack-25 text-[30px] font-bold' >
                    200+
                </p>
                <p className='text-richblack-500'>
                    Courses
                </p>
            </div>

            <div className='flex flex-col items-center justify-center'>
                <p className='text-richblack-25 text-[30px] font-bold' >
                    50+
                </p>
                <p className='text-richblack-500'>
                    Awards
                </p>
            </div>
        </div>


        <div className='mt-[100px] w-11/12 mx-auto scale-110'>
            <LearningGrid/>
        </div>

        <div className='w-[33%] mt-[5%] mb-[5%]'>
            <ContactFormSection heading1={"Get in Touch"} heading2="We’d love to here for you, Please fill out this form." />
        </div>

        <Footer className='w-full' />

    </div>
  )
}

export default Aboutus
