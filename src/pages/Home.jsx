import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAButton from "../components/core/HomePage/Button"
import banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import BecomeInstructor from "../components/core/HomePage/BecomeInstructor";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";


const Home = () => {

    return (
        <div className="">

            {/* Section 1 */}
            <div className="ralative mx-auto flex flex-col max-w-[800px] items-center
                             text-white justify-between top-[124px] left-[264px] gap-[38px] ">

                <div className=" group mt-16 p-1 max-auto rounded-full bg-richblack-800 hover:scale-95 transition-all duration-200 w-fit ">
                    <Link to={"/signup"} >
                            <div className="group-hover:bg-richblack-500 transition-all duration-200 gap-2 px-10 py-[5px] flex text-center items-center rounded-full ">
                                <p>Become an Instructor</p>
                                <FaLongArrowAltRight />
                            </div>
                    </Link>
                </div>

                <div className="flex flex-col lg:gap-[10px] gap-[38px]  max-w-full items-center justify-between">
                    <div className=" h-[44px] w-full max-w-4/5 leading-none text-center traking-tight text-[36px]"
                            style={{ color: 'rgba(241, 242, 255, 1)' }}>
                        Empower Your Future With <HighlightText text={"Coding Skills"} />
                    </div>
                    <div className="  max-w-4/5 text-base flex items-center justify-center text-center"
                            style={{color: 'rgba(131, 136, 148, 1)'}}>
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                    </div>
                </div>

                <div className="max-h-[50px] max-w-[400px] flex flex-row gap-[24px] justify-between ">
                    <CTAButton active={true} linkto="/signup">Learn More</CTAButton>
                    <CTAButton active={false} linkto="/login">Book a Demo</CTAButton>
                </div>
            </div>

            {/* video Section */}
            <div className="flex justify-center items-center mt-10 scale-[70%] lg:scale-[100%]">
                <div className="shadow-blue-200 "
                    style={{
                        boxShadow: '10px 10px 0px 0px #F5F5F5'
                    }}>
                    <video muted loop autoPlay className="max-w-[700px] max-h-[515px]">
                        <source src={banner} type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* Code Typing Section */}
            <div className="flex flex-col translate-x-[-30%] lg:translate-x-0 lg:gap-12  gap-[300px]">
                {/* Code Section 1 */}
                <div className="mt-12 ml-[120px]">
                    <CodeBlocks 
                        position={"flex-row"}
                        heading={
                            <div className="flex flex-col text-[28px]">
                                <div className="flex gap-1">
                                    <span className="text-white ">Unlock your</span>
                                    <HighlightText text={"coding potential"}/>
                                </div>
                                <div className="text-white">with our online courses.</div>
                            </div>
                        } 
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={
                            {
                                active: true,
                                Text: "Try it YourSelf",
                                linkto: "/signup"
                            }
                        }
                        ctabtn2={
                            {
                                active: false,
                                Text: "Learn More",
                                linkto: "/login"
                            }
                        }

                        codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a></nav>\n</body>\n</html>`}
                        codecolor={"text-yellow-25"}
                    />
                </div>

                {/* Code Section 2 */}
                <div className="mt-12 ml-[120px] opacity-0 lg:opacity-100">
                    <CodeBlocks 
                    position={"flex-row-reverse"}
                    heading={
                        <div className="flex flex-col text-[28px]">
                            <div className="flex gap-1">
                                <span className="text-white ">Unlock your</span>
                                <HighlightText text={"coding potential"}/>
                            </div>
                            <div className="text-white">with our online courses.</div>
                        </div>
                    } 
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctabtn1={
                        {
                            active: true,
                            Text: "Try it YourSelf",
                            linkto: "/signup"
                        }
                    }
                    ctabtn2={
                        {
                            active: false,
                            Text: "Learn More",
                            linkto: "/login"
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a></nav>\n</body>\n</html>`}
                    codecolor={"text-yellow-25"}
                    />
                </div>
            </div>

            <div className="">
                <ExploreMore/>
            </div>


            <div className="bg-puregreys-25 text-richblack-700 border-2 border-black ">

                <div className="frame_image h-[300px] items-center flex justify-center">
                    <div className="flex justify-center text-center text-bold gap-5 items-center translate-y-12">
                        <CTAButton active={true} linkto={"/signup"} >
                            <div className="flex justify-center items-center gap-2 text-bold" >
                                Explore Full Catalog
                                <FaLongArrowAltRight />
                            </div>
                        </CTAButton>

                        <CTAButton active={false} linkto={"/signup"}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>
                
                

                <div className="w-11/12 mx-auto max-w-maxContent ">

                    <div className="flex flex-row w-10/12 mx-auto mt-[30px] justify-evenly gap-7">
                        <div className="font-bold text-[26px] w-1/3"> 
                            Get the skills you need for a <HighlightText text={"job that is in demand"} />
                        </div>

                        <div className="w-1/2 flex flex-col justify-between gap-[50px]">
                            <div className="text-[16px] text-sm">
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>

                            <div className="font-bold w-[150px]">
                                <CTAButton active={true} linkto={"/signup"}>
                                    Learn More
                                </CTAButton>
                            </div>
                        </div>
                    </div>

                    <TimelineSection/>
                    <LearningLanguageSection/>
                </div>
            </div>

            <div className="w-11/12">
                <BecomeInstructor/>
            </div>

            <div>
                <Footer/>
            </div>

        </div>
    )
}

export default Home;


