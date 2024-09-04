const {instance} = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const MailSender = require("../utils/MailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


//capture payment and intiate the razorpay order
exports.CapturePayment = async (req, res) => {
    try{

        //get courseId and UserId
        const userid = req.user.id;
        const {courseId} = req.body;
        
        //valid CourseID and CourseDetails
        if(!courseId)
        {
            return res.status(400).json({
                success: false,
                message: 'not valid courseId'
            });
        }

        let course;
        try{

            course = await Course.findById(courseId);

            if(!course)
            {
                return res.status(400).json({
                    success: false,
                    message: 'course not found'
                });
            }

            //User Paid already for same course or not
            const uid = new mongoose.Types.ObjectId(userid);
            
            if(course.StudentsEnrolled.includes(uid))
            {
                return res.status(400).json({
                    success: false,
                    message: 'student already enrolled this course'
                });
            }
        }
        catch(e)
        {
            return res.status(400).json({
                success: false,
                message: e.message,
            });
        }

        
        //create order
        const amount = course.Price;
        const currency = "INR";

        const options = {
            amount: amount*100,
            currency,
            receipt: Math.random(Date.now()).toString,
            notes: {
                courseId: courseId,
                userid
            }
        }

        try{
            //initiate the payment using razorpay
            const PaymentResponse = await instance.orders.create(options);
            console.log("paymentresponse is: ", PaymentResponse);
        }
        catch(e)
        {
            console.log(e);
            return res.status(400).json({
                success: false,
                message: 'error while initiating order'
            });
        }

        //return response
        return res.status(200).json({
            success: true,
            message: 'initiating order successfully',
            CourseName: course.CourseName,
            CourseDescription: course.CourseDescription,
            Thumbnail: course.Thumbnail,
            OrderId: PaymentResponse.id,
            Currency: PaymentResponse.Currency,
            amount: PaymentResponse.amount
        });
    }
    catch(e)
    {
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
}


//verify signature of razorpay and server
exports.VerifySignature = async (req, res) => {
    try{

        const Signature = req.headers["x-razorpay-signature"];
        
        const WebHookSecret = "123456";
        const shasum = crypto.createHmac("sha256", WebHookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if(Signature === digest)
        {
            console.log("payment successfully");

            const {courseId, userid} = req.body.payload.payment.entity.notes;

            try{

                //Allocate user to Course
                const course = await Course.findByIdAndUpdate(
                                                                {_id: courseId}, 
                                                                {$push: {StudentsEnrolled: userid}},
                                                                {new: true}
                );

                if(!course)
                {
                    return res.status(400).json({
                        success: false,
                        message: 'course not found'
                    });
                }
                
                console.log("course is: ", course);

                //Allocate course to user
                const EnrolledStudents = await User.findByIdAndUpdate(
                                                                        {_id: userid},
                                                                        {$push: {Courses: courseId}},
                                                                        {new: true}
                );

                console.log("Enrolled students are: ",EnrolledStudents);

                //Send Mail to user of confirmation of succesffully purchased course
                const EmailResponse = await MailSender(
                                                        EnrolledStudents.Email,
                                                        "Title of congratulations",
                                                        "Description for mail"
                );

                console.log("EmailResponse is: ", EmailResponse);

                return res.status(200).json({
                    success: true,
                    message: 'Course allocated successfully and sent mail to user'
                });
            }
            catch(e)
            {
                return res.status(400).json({
                    success: false,
                    message: 'Error during allocation of course to user'
                });
            }
            
        }
        else
        {
            return res.status(400).json({
                success: false,
                message: 'Signature Not Matched'
            });
        }

    }
    catch(e)
    {
        return res.status(400).json({
            success: false,
            message: 'Error during Signature Varification and allocation of course'
        });
    }
}


