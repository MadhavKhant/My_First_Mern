import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import NestedView from './NestedView';
import { setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/CourseDetails';
import { setCourse } from '../../../../../slices/courseSlice';

const CourseBuilderForm = () => {

  const {register, reset, handleSubmit,getValues, setValue, formState:{errors}} = useForm();
  const {course} = useSelector((state) => (state.course));
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
 
  const cancleEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const onSubmit = async (data) => {

    setLoading(true)
    let result;

    if(editSectionName){
      result = await updateSection({
        SectionName: data.sectionName,
        SectionId: data.SectionId,
        CourseId: course.data?._id
      }, token)

      
    }
    else{
      result = await createSection({
        SectionName: data.sectionName,
        CourseId: course.data?._id
      }, token)


    }
    
    if(result){
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }

    setLoading(false)
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId){
      cancleEdit();
      return
    }

    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
    setValue("SectionId", sectionId);
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true))
  }

  const goToNext = () => {

    //if no changes
    if(course.data.CourseContent.length === 0){
      console.log("enter in if")
      toast.error("Please add atleas one section")
      return
    }

    const AllSection = course.data.CourseContent;
    console.log("AllSection: ", AllSection.length);

    for(let i=0; i<AllSection.length; i++){
      if(AllSection[i].SubSection.length === 0){
        toast.error("Atleast one subsection require in each section")
        return
      }
    }

    dispatch(setStep(3));
  }



  return (
    <div className='text-white text-center px-8 py-5 border-2 border-richblack-600 bg-richblack-800 rounded-lg'>
      <p className='text-lg font-semibold'>Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)} className='gap-5'>

        {/* SectionName */}
        <div className='flex flex-col gap-4 p-3'>
          <label className='text-sm text-white '>
            Section Name
            <input
              {...register("sectionName", {required:true})}
              placeholder='Enter Section Name'
              className='w-full rounded-md px-2 py-1 text-black'
            />
          </label>
          {
            errors.sectionName && (<span className=' text-xs text-pink-200'>Section Name required</span>)
          }
        </div>

          {/* Buttons */}
          <div className='flex flex-row gap-5'>
            <button 
              type='submit'
              className='bg-yellow-200 px-3 transition-all mb-4
               duration-200 py-2 rounded-lg text-richblack-700 font-semibold hover:scale-[90%]' 
            >
              {
                editSectionName ? "Edit Section Name" : "Create Section"
              }
            </button>

            {
              editSectionName && (
                <button
                  onClick={cancleEdit}
                  className='px-3 py-1 text-sm bg-richblack-700 text-richblack-300 hover:scale-[90%] rounded-lg'
                >
                  Cancle Edit
                </button>
              )
            }
          </div>
      </form>

      {
        course?.data?.CourseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName = {handleChangeEditSectionName} />
        ) 
      }

      {/* Next and Prev Buttons */}
      <div className='flex gap-4 mt-6 text-md'>
        <button
          onClick={goBack}
          className='px-3 py-1  bg-richblack-700 text-richblack-300 hover:scale-[90%] rounded-lg'
        >
          Back
        </button>

        <button
          className='bg-yellow-200 px-3 transition-all
          duration-200 py-2 rounded-lg text-richblack-700 font-semibold hover:scale-[90%]' 
          onClick={goToNext}
        >
          Next
        </button>
      </div>

    </div>
  )
}

export default CourseBuilderForm
