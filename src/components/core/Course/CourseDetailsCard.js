import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';
import { FaRegClock } from "react-icons/fa6";
import { FaArrowPointer } from "react-icons/fa6";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { HiClipboardDocumentCheck } from "react-icons/hi2";



const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        Thumbnail,
        Price,
    } = course;

    const handleAddToCart = () => {
        if(user && user?.AccountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you cant buy a course");
            return;
        }
        if(token) {
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login for add to cart",
            btnT1:"login",
            btnT2:"cancel",
            btnH1:()=>navigate("/login"),
            btnH2: ()=> setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard")
    }

    return (
        <div className='flex justify-center gap-3'>
            <img 
                src={Thumbnail}
                alt='Thumbnail_Image'
                className=' w-[300px] h-[270px] rounded-xl'
            />

            <div className='flex flex-col gap-y-6'>
                <p className='text-3xl text-white'>
                    Rs. {Price}
                </p>

                <button
                 className='bg-yellow-50 text-richblack-900 transition-all duration-300 hover:text-white hover:font-bold
                 hover:scale-[90%] hover:bg-yellow-500 w-full mt-5 mb-2 py-2 px-6 rounded-3xl'
                    onClick={
                        user && course?.StudentsEnrolled.includes(user?._id)
                        ? ()=> navigate("/dashboard/enrolled-courses")
                        : handleBuyCourse
                    }
                >
                    {
                        user && course?.StudentsEnrolled.includes(user?._id) ? "Go to Course ": "Buy Now"
                    }
                </button>

                {
                    (!course?.StudentsEnrolled.includes(user?._id)) && (
                        <button onClick={handleAddToCart}  
                        className='bg-yellow-50  text-richblack-900 transition-all duration-300 hover:text-white hover:font-bold
                        hover:scale-[90%] hover:bg-yellow-500 w-full py-2 px-6 rounded-3xl'>
                            Add to Cart
                        </button>
                    )
                }
            </div>

            <div className='flex flex-col justify-center  text-white gap-2'>
                <p className='text-richblack-300 text-sm text-center'>
                    30-Day Money-Back Guarantee
                </p>

                <p className='text-richblack-100'>
                    This Course Includes:
                </p>

                {/* <div className='flex flex-col gap-y-3 text-caribbeangreen-200'>
                    {
                        course?.Instructions?.map((item, index)=> (
                            <p key={index} className='flex gap-2'>
                                <span>{item}</span>
                            </p>
                        ))
                    }
                </div> */}

                <div className='flex flex-col gap-y-1 text-caribbeangreen-200'>
                    <div className='flex items-center gap-2'><FaRegClock/> <p>8 hours on-demand video</p></div>
                    <div className='flex items-center gap-2'><FaArrowPointer/> <p>Full Lifetime Access</p></div>
                    <div className='flex items-center gap-2'><MdOutlineDocumentScanner/> <p>Access on mobile and TV</p></div>
                    <div className='flex items-center gap-2'><HiClipboardDocumentCheck/> <p>Certificate on Complition</p></div>
                </div>
            </div>
            <div>
                <button
                className='mx-auto flex items-center gap-2 p-6 text-yellow-50'
                onClick={handleShare}
                >
                    Share
                </button>
            </div>
        </div>
    );

}

export default CourseDetailsCard