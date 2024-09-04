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

const CourseInformationForm = () => {

    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm();
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    const {step} = useSelector((state) => state.course)

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            const categoriesData = await fetchCourseCategories();
            console.log("fetch Course Categories in CourseInformation: ", categoriesData);
            
            if(categoriesData.alltags.length > 0){
                setCourseCategories(categoriesData.alltags);
            }
            setLoading(false);
        }

        console.log("Course: in useEffect: ", course);
        if(editCourse) {
            setValue("courseTitle", course.data.CourseName);
            setValue("courseShortDesc", course.data.CourseDescription);
            setValue("coursePrice", course.data.Price);
            //setValue("courseTags", course.Tag);
            setValue("courseBenefits", course.data.WhatYouWillLearn);
            setValue("courseCategory", course.data.Category);
            setValue("courseRequirements", course.data.Instructions);
            setValue("courseImage", course.data.Thumbnail);
        }

        getCategories();
    },[])


    const isFormUpdated = () => {
        const currentValues = getValues();
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

                formData.append("courseId", course.data._id);
                if(currentValues.courseTitle !== course.data.CourseName) {
                    formData.append("courseName", data.courseTitle);
                }

                if(currentValues.courseShortDesc !== course.data.CourseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }

                if(currentValues.coursePrice !== course.data.Price) {
                    formData.append("price", data.coursePrice);
                }

                if(currentValues.courseBenefits !== course.data.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if(currentValues.courseCategory._id !== course.data.Category._id) {
                    formData.append("category", data.courseCategory);
                }

                if(currentValues.courseRequirements.toString() !== course.data.Instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }

                setLoading(true)
                const result = await editCourseDetails(formData, token);
                setLoading(false)
                if(result){
                    setStep(2);
                    dispatch(setCourse(result))
                }
                else{
                    toast.error("No changes made so far")
                }
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
        lg:w-[500px] sm:w-[350px] md:w-[450px] border-yellow-500 border-[1px] '>

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
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editCourse ? course?.data?.Thumbnail : null}
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
                editCourse && (
                    <div className='flex gap-5 text-white'>
                        <button
                            onClick={() => dispatch(setStep(2))}
                        >
                            Continue without saving
                        </button>

                        <button>
                            Save Changes and next
                        </button>
                    </div>
                )
            }

            <button className='text-white py-1 px-2 bg-yellow-300 transition-all duration-200
            rounded-lg hover:bg-richblack-400 hover:text-black hover:scale-[90%] text-[15px]'>
                {
                    !editCourse ? "Next" : "Save Changes"
                }
            </button>

            
        </div>

    </form>
  )
}

export default CourseInformationForm
