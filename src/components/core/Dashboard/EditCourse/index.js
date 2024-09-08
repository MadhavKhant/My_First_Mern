import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourse/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../services/operations/CourseDetails";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";


export default function EditCourse(){

    const {course} = useSelector((state) => state.course);
    const {CourseId} = useParams();
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();



      useEffect(() => {

        const work = async () => {
          setLoading(true);
          try{
            const res = await getFullDetailsOfCourse(CourseId, token);
            
            dispatch(setEditCourse(true));
            dispatch(setCourse(res));

            setLoading(false);
          }
          catch(e){
            console.log(e);
            setLoading(false);
          }
        }

        work();

      }, [])

      if (loading) {
        return (
          <div className="grid flex-1 place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

    return (
        <div>
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Edit Course
          </h1>
          <div className="mx-auto max-w-[600px]">
            {course ? (
              <RenderSteps />
            ) : (
              <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                Course not found
              </p>
            )}
          </div>
        </div>
      )
}