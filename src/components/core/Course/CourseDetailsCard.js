import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';



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
            console.log("dispatching add to cart")
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
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
        <div>
            <img 
                src={Thumbnail}
                alt='Thumbnail_Image'
                className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl'
            />
            <div>
                Rs. {Price}
            </div>
            <div className='flex flex-col gap-y-6'>
                <button
                 className='bg-yellow-50 w-fit text-richblack-900'
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
                        className='bg-yellow-50 w-fit text-richblack-900'>
                            Add to Cart
                        </button>
                    )
                }
            </div>

            <div>
                <p>
                    30-Day Money-Back Guarantee
                </p>
                <p>
                    This Course Includes:
                </p>
                <div className='flex flex-col gap-y-3'>
                    {
                        course?.Instructions?.map((item, index)=> (
                            <p key={index} className='flex gap-2'>
                                <span>{item}</span>
                            </p>
                        ))
                    }
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