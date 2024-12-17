const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {UploadImageToCloudinary} = require("../utils/ImageUploader");
const CourseProgress = require("../models/CourseProgress")


//Create Course Handler function
exports.CreateCourse = async (req, res) => {
    try{
        
        //check for instructor as only instructor can create course
        const userid_Instructor = req.user.id;
        const Instructor_Detail = await User.findById(userid_Instructor);
        
        //validation
        if(!Instructor_Detail)
        {
            return res.status(400).json({
                success: false,
                message: 'Instructor detail not found'
            });
        }

        ///fetch data
        const {CourseName, CourseDescription, WhatYouWillLearn, Price, 
            //Tag,
        Categoryid, Instructions} = req.body;
        const thumbnail = req.files.Thumbnail;
        let {Status} = req.body;

        //validation
        if(!CourseName || !CourseDescription || !WhatYouWillLearn || !Price ||
            //|| !Tag || 
            !thumbnail 
            || !Categoryid || !Instructions)
        {
            return res.status(400).json({
                success: false,
                message: 'All field require in Create Course Controllers'
            });
        }

        //check given tag is valid or not
        // const tagDetail = await User.findById(Tag);
        // if(!tagDetail)
        // {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Tag detail is not found'
        //     });
        // }

        // Check if the tag given is valid
		const categoryDetails = await Category.findById(Categoryid);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
        

        if(!Status)
        {
            Status = "Draft";
        }

        //Upload image Top cloudinary
        const thumbnailImage = await UploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new course
        const NewCourse = await Course.create({
            CourseName,
            CourseDescription,
            Price,
            //Tag: Tag,
            //thumbnail: thumbnailImage.secure_url,
            WhatYouWillLearn: WhatYouWillLearn,
            Instructor: Instructor_Detail._id,
            Category: categoryDetails._id,
            Thumbnail: thumbnailImage.secure_url,
            Status: Status,
            Instructions: Instructions
        });

        const AddCourseIdinChoosenCategory = await Category.findByIdAndUpdate(
            Categoryid,
            {
                $push:{
                    Course: NewCourse._id
                }
            },
            {new: true}
        )

        //add new course to model of instructor 
        await User.findByIdAndUpdate(
            {_id: userid_Instructor}, 
            {
                $push: {
                    Courses: NewCourse._id
                }
            });
        
        return res.status(200).json({
            success: true,
            message: 'new course created',
            data: NewCourse
        })

    }
    catch(e)
    {
        // Handle any errors that occur during the creation of the course
		console.log(e);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: e.message,
		});
    }
}


//Get all courses Handler fucntion
exports.GetAllCourses = async (req, res) => {
    try{

        const All_Courses = await Course.find({}, {
                                                    CourseName: true,
                                                    Price:true,
                                                    Thumbnail:true,
                                                    Instructor:true,
                                                    RatingAndReview: true,
                                                    StudentEnrolled: true, 
                                                })
                                                .populate("Instructor")
                                                .exec();

        return res.status(200).json({
            success: true,
            message: 'Data of all courses fetch successfully',
            data: All_Courses
        })
    }
    catch(e)
    {
        return res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}


exports.GetCourseDetails = async (req, res) => {
    try{

        const {courseId} = req.body;

        if(!courseId)
        {
            return res.status(400).json({
                success: false,
                message: 'courseId not found'
            });
        }

        const course = await Course.findById({_id: courseId})
                                            .populate(
                                                {
                                                    path: "Instructor",
                                                    populate: {
                                                        path: "AdditionalDetail"
                                                    },
                                                },
                                            )
                                            .populate("Category")
                                            .populate("RatingAndReview")
                                            .populate({
                                                path: "CourseContent",
                                                populate: {
                                                    path: "SubSection"
                                                }
                                            })
                                            .exec();
            

        //validation
        if(!course)
        {
            return res.status(400).json({
                success: false,
                message: `Course not found with id: ${courseId}`
            });
        }

        const courseProgress = await CourseProgress.findOne({
            courseId:courseId
        })

        return res.status(200).json({
            success: true,
            message: 'Course Details Fetched successfully',
            data: course
        });
    }
    catch(e)
    {
        console.log("Error is: ", e);
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
}

exports.TopThreeCourses = async (req, res) => {
    //get top 3 selling courses
    try{

        const TopThreeCourses = await Course.find({}).sort({StudentsEnrolled: -1}).limit(3);

        if(TopThreeCourses.length > 0)
        {
            return res.status(200).json({
                success: true,
                message: 'Top three courses fatched',
                data: TopThreeCourses
            });
        }
        else{
            return res.status(200).json({
                sucess: true,
                message: 'No courses available'
            });
        }

    }
    catch(e)
    {
    
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}


exports.UpdateCourse = async (req, res) => {
    try{

        const {CourseId, CourseName, CourseDescription, WhatYouWillLearn, Price, Tag, Categoryid, Instructions, CourseStatus} = req.body
        const thumbnail = req.files ? req.files.ThumbnailImage : null;

        const course = await Course.findById(CourseId);

        if (!course) {
            return res.status(404).json({
              success: false,
              message: 'Course not found',
            });
          }
        
        if (CourseName) course.CourseName = CourseName;
        if (CourseDescription) course.CourseDescription = CourseDescription;
        if (WhatYouWillLearn) course.WhatYouWillLearn = WhatYouWillLearn;
        if (Price) course.Price = Price;
        if (Tag) course.Tag = Tag;
        if (Categoryid) course.Category = Categoryid;
        if (Instructions) course.Instructions = Instructions;
        if (CourseStatus) course.Status = CourseStatus;

        

        if(thumbnail) {
            const x = await UploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            course.Thumbnail = x.secure_url;
        }


        const updatedCourse = await course.save();

        return res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            data: updatedCourse,
          });

    }
    catch(e)
    {
        
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}


exports.DeleteCourse = async (req, res) => {
    try{
        //fetch data
        const {courseId} = req.body;
        const course = await Course.findById(courseId);


        //remove course from entrolled student's courses
        await Promise.all(course.StudentsEnrolled.map(async (studentId) => {
            await User.findByIdAndUpdate(studentId, {$pull: {Courses: courseId}});
        }));

        //remove course from Instructor's Course
        const instructor = await User.findByIdAndUpdate(
            { _id: course.Instructor }, 
            { $pull: { Courses: courseId }}
        );


        //remove course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        })
    }
    catch(e){
       
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

exports.DeleteCourseOfStudent = async (req, res) => {
    try{

        const {CourseId} = req.body;
        const UserId = req.user.id;

        if(!CourseId || !UserId)
        {
            return res.status(400).json({
                success: false,
                message: "Missing Data he"
            })
        }

        //Remove userId from enrolled course
        const UpdatedCourse = await Course.findByIdAndUpdate(
            {_id: CourseId},
            {
                $pull: {
                    StudentsEnrolled: UserId
                }
            },
            {new:true}
        )

        //remove courseId from user in
        const updatedUser = await User.findByIdAndUpdate(
            {_id: UserId},
            {
                $pull: {
                    Courses: CourseId
                }
            }
        )

        return res.status(200).json({
            success: true,
            data: UpdatedCourse,
            message: "Course Deleted Successfully"
        })
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message: e.message
        })
    }
}

exports.DeleteAllEnrolledCourseOfStudent = async (req, res) => {
    try{
        
        //fetch user id
        const UserId = req.user.id;
        

       const user = await User.findById(UserId);
       const Courses = user.Courses;
       user.Courses = [];
       const data = user.Courses;
       user.save();

       Courses.forEach(async (course) => {
        let id = course._id;
        await Course.findByIdAndUpdate(
            {_id: id},
            {
                $pull:{
                    StudentsEnrolled: UserId
                }
            }
        )
       })
        
        return res.status(200).json({
            success:true,
            message: "All Enrolled Courses Deleted",
            data
        })


    }
    catch(e){
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

exports.getInstructorCourses = async (req, res) => {
    try{

        const InstructorId = req.user.id;
       

        if(!InstructorId){
            return res.status(400).json({
                success:false,
                message:"Instructor Id not found"
            })
        }

        const InstructorCourse = await Course.find({Instructor: InstructorId});


        return res.status(200).json({
            success:true,
            message:"Successfully Fetched Instructor's Courses",
            data:InstructorCourse,
        })

    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}