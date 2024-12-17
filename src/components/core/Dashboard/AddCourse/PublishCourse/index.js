import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCourseState, setPaymentLoading, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operations/CourseDetails";


export default function PublishCourse(){

    const {register, reset, handleSubmit, setValue, getValues, formState:{errors}} = useForm();
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth);

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async () => {

        //check if form updated or not
        if(
            (course.data.Status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || 
            (course.data.Status === COURSE_STATUS.DRAFT && getValues("public") === false)
        ){
            goToCourses()
            return 
        }

        const CourseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;

        const formData = new FormData();
        formData.append("CourseId", course.data._id);
        formData.append("CourseStatus", CourseStatus);

        setLoading(true);

        const result = await editCourseDetails(formData, token);
        if(result){
            goToCourses()
        }

        setLoading(false)


    }

    const onSubmit = async (data) => {
        handleCoursePublish();
    }


    return (
        <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">


            <p className="text-2xl font-semibold text-richblack-5">
                Publish Setting
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Checkbox */}
                <div className="my-6 mb-8">
                    <label className="inline-flex items-center text-lg">
                        <input
                            type="checkbox"
                            id="public"
                            {...register("public")}
                            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                        />
                        <span className="ml-2 text-richblack-400">
                            Make this Course as Public
                        </span>
                    </label>
                </div>

                {/*Next and Prev button */}
                <div className="ml-auto flex max-w-max items-center gap-x-4">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={goBack}
                        className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                    >
                        Back
                    </button>

                    <button
                        disabled={loading}
                    >
                        Save Changes
                    </button>
                </div>
            </form>


        </div>
    )
}