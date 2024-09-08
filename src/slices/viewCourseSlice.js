import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData: [],
    completedLecture: [],
    courseEntireData: [],
    totalNoofLecture: 0,
}

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload
        },
        
        setEntireCourseData: (state, action) => {
            state.courseEntireData = action.payload
        },
        
        updateCompleteLecure: (state, action) => {
            state.completedLecture = [...state.completedLecture, action.payload];
        },
        
        setTotalNoofLecture: (state, action) => {
            state.totalNoofLecture = action.payload
        },

        setCompletedLecture: (state, action) => {
            state.completedLecture = action.payload
        }

    }
})

export const {setCourseSectionData, 
            setEntireCourseData, 
            updateCompleteLecure, 
            setTotalNoofLecture, 
            setCompletedLecture} = viewCourseSlice.actions

export default viewCourseSlice.reducer