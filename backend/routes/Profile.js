const express = require("express");
const router = express.Router();

const {auth} = require("../middlewares/auth");

const {UpdateProfile, DeleteAccount, GetUserDetails, GetEnrolledCourses, UpdateDisplayPicture} = require("../controllers/Profile");


router.put("/UpdateProfile", auth, UpdateProfile)
router.delete("/DeleteProfile", auth, DeleteAccount)
router.get("/GetUserDetails", auth, GetUserDetails)
router.get("/GetEnrolledCourses", auth, GetEnrolledCourses)
router.put("/UpdateDisplayPicture", auth, UpdateDisplayPicture)

module.exports = {ProfileRoute: router};




