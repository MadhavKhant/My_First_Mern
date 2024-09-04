import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from '../../../../../services/operations/CourseDetails'
import { setCourse } from "../../../../../slices/courseSlice"
import Upload from "../Upload"

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.Title)
      setValue("lectureDesc", modalData.Description)
      setValue("lectureVideo", modalData.VideoUrl)
    }
  }, [])

  // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues()
    if (
      currentValues.lectureTitle !== modalData.Title ||
      currentValues.lectureDesc !== modalData.Description ||
      currentValues.lectureVideo !== modalData.VideoUrl
    ) {
      return true
    }
    return false
  }

  // handle the editing of subsection
  const handleEditSubsection = async () => {
    const currentValues = getValues()
    const formData = new FormData()

    formData.append("SectionId", modalData.SectionId)
    formData.append("SubSectionId", modalData._id)
    if (currentValues.lectureTitle !== modalData.Title) {
      formData.append("Title", currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modalData.Description) {
      formData.append("Description", currentValues.lectureDesc)
    }
    if (currentValues.lectureVideo !== modalData.VideoUrl) {
      formData.append("video", currentValues.lectureVideo)
    }

    setLoading(true)
    const result = await updateSubSection(formData, token)  
    if (result) {
        
      const updatedCourseContent = course.data.CourseContent.map((section) =>
        section._id === modalData.SectionId ? result : section
      )

      const updatedCourse = {
        ...course,
        data:{
            ...course.data,
            CourseContent: updatedCourseContent
        }
      }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }
      return
    }

    const formData = new FormData()
    formData.append("SectionId", modalData)
    formData.append("Title", data.lectureTitle)
    formData.append("Description", data.lectureDesc)
    formData.append("video", data.lectureVideo)

    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.data.CourseContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedCourse = {
        ...course,
        data:{
            ...course.data,
            CourseContent:updatedCourseContent
        }
      }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => setModalData(null) }>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Lecture Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.VideoUrl : null}
            editData={edit ? modalData.VideoUrl : null}
          />
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full text-richblack-50 font-semibold"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full text-richblack-50 font-semibold"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex px-4 font-semibold 
                    py-2 rounded-lg bg-yellow-400 hover:scale-[90%] hover:bg-yellow-500 w-fit ">
              <button>
                {
                    loading ? "Loading.." : edit ? "Save Changes" : "Save"
                }
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}