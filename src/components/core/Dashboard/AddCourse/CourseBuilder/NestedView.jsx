import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import {deleteSection, deleteSubSection} from "../../../../../services/operations/CourseDetails"
import { setCourse } from "../../../../../slices/courseSlice"
import LogoutModal from '../../../../common/LogoutModal'
import SubSectionModal from "./SubSectionModal"
import { useEffect } from "react"


export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  
  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)


  //Delete section
  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      SectionId :sectionId,
      CourseId: course.data._id,
      token,
    })

    if (result) {
      dispatch(setCourse(result));
    }

    setConfirmationModal(null)
  }

  //Delete Subsection
  const handleDeleteSubSection = async (SubSectionId, SectionId) => {
    const result = await deleteSubSection({ SubSectionId, SectionId, token })
    if (result) {
      // update the structure of course
      const updatedCourseContent = course?.data?.CourseContent.map((Section) =>
        Section._id === SectionId ? result : Section
      ) 
      const updatedCourse = {
        ...course, 
        data:{
          ...course.data,
          CourseContent: updatedCourseContent 
        }}
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

  return (
    <>
      <div
        className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer"
      >
        {course?.data?.CourseContent.map((Section) => (
          // Section Dropdown
          <details key={Section._id} open>

            {/* Section Dropdown Content */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {Section.SectionName}
                </p>
              </div>

              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      Section._id,
                      Section.SectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-richblack-300" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btnT1: "Delete",
                      btnT2: "Cancel",
                      btnH1: () => handleDeleteSection(Section._id),
                      btnH2: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
              </div>

            </summary>

            <div className="px-6 pb-4">
              {/* Render All Sub Sections Within a Section */}
              {Section?.SubSection.map((data) => (
                <div
                  key={data._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                {/* dropdown icon and subsection title */}
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.Title}
                    </p>
                  </div>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    {/* Edit subsection icon */}
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, SectionId: Section._id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>

                    {/* Delete subsection icon */}
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btnT1: "Delete",
                          btnT2: "Cancel",
                          btnH1: () => handleDeleteSubSection(data._id, Section._id),
                          btnH2: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add New Lecture to Section */}
              <button
                onClick={() => (
                  setAddSubsection(Section._id)
                )}
                className={` 
                mt-3 flex px-2 py-1 items-center hover:scale-[90%] transition-all duration-500
                rounded-lg gap-x-1 text-yellow-50 border-[3px] border-richblack-300`}
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
      {/* Modal Display */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}
      {/* Confirmation Modal */}
      {confirmationModal ? (
        <LogoutModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </>
  )
}