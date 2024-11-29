import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {  useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {editCourseDetails, fetchCourseCategories} from '../../../../../services/operations/CourseDetails'
import RequirementField from './RequirementField'
import { setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { setCourse } from '../../../../../slices/courseSlice';
import { addCourseDetails } from '../../../../../services/operations/CourseDetails';
import { COURSE_STATUS } from '../../../../../utils/constants';
import Upload from '../Upload'
import { useNavigate } from 'react-router-dom';

const CourseInformationForm = () => {

    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm();
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    const {step} = useSelector((state) => state.course);
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            const categoriesData = await fetchCourseCategories();
            if(categoriesData.data.length > 0){
                setCourseCategories(categoriesData.data);
            }
            setLoading(false);
        }

        
        if(editCourse) {
            setValue("courseTitle", course.CourseName);
            setValue("courseShortDesc", course.CourseDescription);
            setValue("coursePrice", course.Price);
            //setValue("courseTags", course.Tag);
            setValue("courseBenefits", course.WhatYouWillLearn);
            setValue("courseCategory", course.Category);
            setValue("courseRequirements", course.Instructions);
            setValue("courseImage", course.Thumbnail);
        }

        getCategories();
    },[])


    const isFormUpdated = () => {
        const currentValues = getValues();


        if(editCourse)
        {
            if(currentValues.courseTitle !== course.CourseName ||
                currentValues.courseShortDesc !== course.CourseDescription ||
                currentValues.coursePrice !== course.Price ||
                currentValues.courseTitle !== course.CourseName ||
                //currentValues.courseTags.toString() !== course.tag.toString() ||
                currentValues.courseBenefits !== course.WhatYouWillLearn ||
                currentValues.courseCategory._id !== course.Category._id ||
                currentValues.courseImage !== course.Thumbnail ||
                currentValues.courseRequirements.toString() !== course.Instructions.toString() )
                return true;
            else
                return false;
        }


        if(currentValues.courseTitle !== course.data.CourseName ||
            currentValues.courseShortDesc !== course.data.CourseDescription ||
            currentValues.coursePrice !== course.data.Price ||
            currentValues.courseTitle !== course.data.CourseName ||
            //currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.data.WhatYouWillLearn ||
            currentValues.courseCategory._id !== course.data.Category._id ||
            currentValues.courseImage !== course.data.Thumbnail ||
            currentValues.courseRequirements.toString() !== course.data.Instructions.toString() )
            return true;
        else
            return false;
    }

    const onSubmit = async(data) => {
        
        if(editCourse) {
            
            if(isFormUpdated()) {
            
                const currentValues = getValues();
                const formData = new FormData();

                

                formData.append("CourseId", course._id);
                if(currentValues.courseTitle !== course.CourseName) {
                    formData.append("CourseName", data.courseTitle);
                }

                if(currentValues.courseShortDesc !== course.CourseDescription) {
                    formData.append("CourseDescription", data.courseShortDesc);
                }

                if(currentValues.coursePrice !== course.Price) {
                    formData.append("Price", data.coursePrice);
                }

                if(currentValues.courseBenefits !== course.WhatYouWillLearn) {
                    formData.append("WhatYouWillLearn", data.courseBenefits);
                }

                if(currentValues.courseCategory._id !== course.Category._id) {
                    formData.append("Category", data.courseCategory);
                }

                if(currentValues.courseRequirements.toString() !== course.Instructions.toString()) {
                    formData.append("Instructions", JSON.stringify(data.courseRequirements));
                }

                if(currentValues.courseImage !== course.Thumbnail){
                    formData.append("ThumbnailImage", data.courseImage)
                }

                setLoading(true)
                const result = await editCourseDetails(formData, token);
                
                if(result && !flag){
                    setStep(2);
                    dispatch(setCourse(result))
                }
                else if(result && flag){
                    dispatch(setCourse(result))
                    navigate("/dashboard/my-courses")
                }
                else{
                    toast.error("No changes made so far")
                }
                setLoading(false)
                return;
            }
        }

            
            
            // //create a new course
            const formData = new FormData();
            formData.append("CourseName", data.courseTitle);
            formData.append("CourseDescription", data.courseShortDesc);
            formData.append("Price", data.coursePrice);
            formData.append("WhatYouWillLearn", JSON.stringify(data.courseBenifits));
            formData.append("Categoryid", data.courseCategory);
            formData.append("Instructions", JSON.stringify(data.courseRequirements));
            formData.append("Status", COURSE_STATUS.DRAFT);
            formData.append("Thumbnail", data.courseImage);


            // const CreateCourseData = {
            //     CourseName: data.courseTitle,
            //     CourseDescription: data.courseShortDesc,
            //     Price: data.coursePrice,
            //     WhatYouWillLearn: data.courseBenifits,  // Already a stringified JSON
            //     Categoryid: data.courseCategory,
            //     Instructions: data.courseRequirements,  // Already a stringified JSON
            //     Status: COURSE_STATUS.DRAFT,
            //     Thumbnail: data.courseImage
            // };
            
            
            setLoading(true);
            const result = await addCourseDetails(formData, token);
            if(result) {
                
                dispatch(setStep(2));
                dispatch(setCourse(result));
                
            }
            setLoading(false);
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} 
        className='bg-richblack-800 flex flex-col py-6 px-8 mx-auto gap-5 rounded-lg
        lg:w-[800px] sm:w-[350px] md:w-[450px] border-yellow-500 border-[1px] '>

        <label className='flex flex-col gap-2'>
            Course title
            <input
                {...register("courseTitle", {required: true})}
                type='text'
                name="courseTitle"
                placeholder='Enter Course Title'
                className='rounded-md bg-richblack-700 py-1 px-2 '
            />
        </label>

        <label className='flex flex-col gap-2'>
            Course Short courseDescription
            <input
                {...register("courseShortDesc", {required:true})}
                placeholder='Enter Description'
                className='rounded-md bg-richblack-700 py-1 px-2 '
            />
        </label>

        <label className='flex flex-col gap-2'>
            price
            <input
                {...register("coursePrice", {required:true, valueAsNumber:true})}
                placeholder='Enter Course price'
                className='rounded-md bg-richblack-700 py-1 px-2 '
            />
        </label>

        <label className='flex flex-col gap-2'>
            Category
            <select
                {...register("courseCategory", {require:true})}
                defaultValue=""
                className='rounded-md text-richblack-50 bg-richblack-500 py-1 px-2 '
            >
                <option value="" >Choose a category</option>
                {
                    !loading && courseCategories.map((ele, index) => {
                        return (
                            <option value={ele._id} key={index} className='bg-richblack-50 text-black font-semibold'>
                                {ele.Name}
                            </option>
                        )
                    })
                }
            </select>
        </label>



        {/* Tag Section*/}


        {/* Thumbnail Image Section */}
        <Upload
            name="courseImage"
            label="Course Thumbnailx"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editCourse ? course?.Thumbnail : null}
        />

        <label className='flex flex-col gap-2'>
            Benifits of the course
            <textarea
                placeholder='Enter benifits of the Course'
                {...register("courseBenifits", {required:true})}
                className='rounded-md bg-richblack-700 py-1 px-2 min-h-[130px] w-full'
            />
        </label>


        {/* Requirement Instruction Part */}
        <div>
            <RequirementField
                name="courseRequirements"
                label="Requirements/Instructions"
                getValues={getValues}
                setValue={setValue}
                register={register}
                errors={errors}
                
            />
        </div>

        {/* Buttons */}
        <div className='flex gap-7 justify-evenly text-white  w-fit'>


            {
                !editCourse && 
                (
                    <button
                        type='submit'
                        className='text-white py-1 px-2 bg-yellow-300 transition-all duration-200
                        rounded-lg hover:bg-richblack-400 hover:text-black hover:scale-[90%] text-[15px]'
                    >
                        Create Course
                    </button>
                )
            }



            {
                editCourse && 
                (
                    <div className='flex gap-5 text-white'>
                        <button onClick={() => dispatch(setStep(2))}
                            className='bg-yellow-400 rounded-md py-1 px-3 text-richblack-50 font-semibold'
                        >
                            Continue without saving
                        </button>

                        <button
                            className='bg-yellow-400 rounded-md py-1 px-3 text-richblack-50 font-semibold'
                            type='submit'
                            onClick={() => setFlag(true)}
                        >
                            Save and goto my Courses
                        </button>

                        <button
                            type='submit'
                            className='bg-yellow-400 rounded-md py-1 px-3 text-richblack-50 font-semibold'
                        >
                            Save Changes and next
                        </button>
                    </div>
                )
            }


            {/* <button 
            type='submit'
            className='text-white py-1 px-2 bg-yellow-300 transition-all duration-200
            rounded-lg hover:bg-richblack-400 hover:text-black hover:scale-[90%] text-[15px]'>
                {
                    !editCourse ? "Create Course" : "Save Changes"
                }
            </button> */}

            
        </div>

    </form>
  )
}

export default CourseInformationForm
