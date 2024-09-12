const express = require("express");
const router = express.Router();


const { CreateCourse, GetAllCourses, GetCourseDetails, TopThreeCourses, UpdateCourse, DeleteAllEnrolledCourseOfStudent, DeleteCourse, DeleteCourseOfStudent, getInstructorCourses } = require("../controllers/Course");
const { CreateCategory, GetAllCategories, CategoryPageDetails } = require("../controllers/Category");
const { CreateSection, UpdateSection, DeleteSection } = require("../controllers/Section");
const { CreateSubSection, updateSubSection, DeleteSubSection } = require("../controllers/SubSection");
const { CreateRatingAndReview, GetAverageRating, GetAllRatingAndReview } = require("../controllers/RatingAndReview");
const { auth, isStudent, isInstructor, isAdmin } = require("../middlewares/auth");
const {updateCourseProgress} = require("../controllers/CourseProgress");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

//-------------------Course-----------------------
router.post("/createCourse", auth, isInstructor, CreateCourse);
router.post("/UpdateCourse", auth, isInstructor, UpdateCourse);
router.delete("/deleteCourse", auth, isInstructor, DeleteCourse);
router.delete("/deleteCourseOfStudent", auth, isStudent, DeleteCourseOfStudent);
router.delete("/deleteAllEnrolledCourseOfStudent", auth, isStudent, DeleteAllEnrolledCourseOfStudent);
router.post("/getFullCourseDetails", auth, GetCourseDetails);
router.post("/getCourseDetails", auth, GetCourseDetails)
router.get("/getAllCourses", GetAllCourses);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.get("/TopThreeCourses", TopThreeCourses);

//-----------------------CourseProgress------------------------------
//router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

//-----------------Section----------------------------
router.post("/addSection", auth, isInstructor, CreateSection);
router.post("/updateSection", auth, isInstructor, UpdateSection);
router.post("/deleteSection", auth, isInstructor, DeleteSection);

//--------------------SubSection-----------------------
router.post("/addSubSection", auth, isInstructor, CreateSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, DeleteSubSection); 



// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

router.post("/CreateCategory", auth,isInstructor, CreateCategory);
router.get("/showAllCategories", GetAllCategories);
router.post("/CategoryPageDetails", CategoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, CreateRatingAndReview);
router.get("/GetAverageRating", GetAverageRating);
router.get("/GetAllRatingAndReview", GetAllRatingAndReview);

module.exports = {CourseRoute: router};
