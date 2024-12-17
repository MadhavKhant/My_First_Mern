const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

//Create RAting
exports.CreateRatingAndReview = async (req, res) => {
    try{

        //get data
        const userid = req.user.id;
        const {Rating, Review, courseId} = req.body;

        //check user enrolled in course or not
        const course = await Course.findOne({_id: courseId, 
                                                StudentsEnrolled: {$eleMatch: {$eq: userid}}});

        if(!course)
        {
            return res.status(400).json({
                success: false,
                message: 'Student is not enrolled in this course'
            });
        }

        //check if user already reviewed or not
        const RatingCheck = await RatingAndReview.findOne({User: userid, Course: courseId});
        if(RatingCheck)
        {
            return res.status(400).json({
                success: false,
                message: 'User already Reviewed for this course'
            });
        }

        //create rating and review
        const ratingreview = await RatingAndReview.create({Rating, Review, Course: courseId, User: userid});

        //attach with course
        const data = await Course.findByIdAndUpdate({_id: courseId}, 
                                        {
                                            $push: {
                                                RatingAndReview: ratingreview._id,
                                            }
                                        },
                                        {new: true}
        );

        
        //return response
        return res.status(200).json({
            success: true,
            message: "Successfully Rating and Review",
            ratingreview,
            data
        })

    }
    catch(e)
    {
        console.log("error is: ", e);
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
}

//get avrage rating
exports.GetAverageRating = async (req, res) => {
    try{

        //fetch data
        const courseId = req.body.courseId;

        //calculate average rating 
        const result = await RatingAndReview.aggregate([
            {
                $match: {course: new mongoose.Types.ObjectId(courseId)}
            },
            {
                $group: {
                    _id: null,
                    AverageRating: {$avg: "Rating"},
                },
            },
        ]);

        //return rating
        if(result.length > 0)
        {
            return res.status(200).json({
                success: true,
                AverageRating: result[0].AverageRating
            });
        }

        //if not rating or review
        return res.status(200).json({
            success: true,
            message: 'Average Rating is 0, No rating given till now',
            AverageRating: 0,
        });

    }
    catch(e)
    {
        console.log("error is: ", e);
        return res.status(400).json({
            success: false,
            message: e.message
        }); 
    }
}

//get all rating and review
exports.GetAllRatingAndReview = async (req, res) => {
    try{

        //fetch data
        const AllReviews = await RatingAndReview.find({})
                                    .sort({Rating: "desc"})
                                    .populate({
                                        path: "User",
                                        select: "Firstname, Lastname Email Image",
                                    })
                                    .populate({
                                        path: "Course",
                                        select: "CourseName"
                                    })
                                    .exec();
        return res.status(200).json({
            success: true,
            message: 'All Rating and review data fetched successfully',
            data: AllReviews
        });
    }
    catch(e)
    {
        console.log("error is: ", e);
        return res.status(400).json({
            success: false,
            message: e.message
        }); 
    }
}