const {instance} = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const MailSender = require("../utils/MailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");


//initiate the razorpay order
exports.capturePayment = async(req, res) => {
 
    const {courses} = req.body;
    const userId = req.user.id;

    console.log("enter in capture part");
    console.log("courses: ", courses);
    console.log("userId: ", userId);

    if(courses.length === 0) {
        return res.json({success:false, message:"Please provide Course Id"});
    }

    let totalAmount = 0;
    console.log("11")

    for(const course_id of courses) {
        let course;
        try{
           
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid  = new mongoose.Types.ObjectId(userId);
            if(course.StudentsEnrolled.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

            totalAmount += course.Price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

    console.log("12")
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    console.log("13");
    console.log("options: ", options);

    try{
        const paymentResponse = await instance.orders.create(options);
        console.log("14")

        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }

}


//verify the payment
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(200).json({success:"false", message:"Payment Failed"});
}


const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{StudentsEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }

        const courseProgress = await CourseProgress.create({
            CourseId: courseId,
            UserId: userId,
            CompletedVideos: [],
        })

        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                Courses: courseId,
                CourseProgress: courseProgress._id,
            }},{new:true})
            
        ///bachhe ko mail send kardo
        const emailResponse = await MailSender(
            enrollStudents.Email,
            `Successfully Enrolled into ${enrolledCourse.CourseName}`,
            courseEnrollmentEmail(enrolledCourse.CourseName, `${enrolledStudent.FirstName}`)
        )    
        //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

}


exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        const enrolledStudent = await User.findById(userId);
        await MailSender(
            enrolledStudent.Email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.FirstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}




// //capture payment and intiate the razorpay order
// exports.CapturePayment = async (req, res) => {
//     try{

//         //get courseId and UserId
//         const userid = req.user.id;
//         const {courseId} = req.body;
        
//         //valid CourseID and CourseDetails
//         if(!courseId)
//         {
//             return res.status(400).json({
//                 success: false,
//                 message: 'not valid courseId'
//             });
//         }

//         let course;
//         try{

//             course = await Course.findById(courseId);

//             if(!course)
//             {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'course not found'
//                 });
//             }

//             //User Paid already for same course or not
//             const uid = new mongoose.Types.ObjectId(userid);
            
//             if(course.StudentsEnrolled.includes(uid))
//             {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'student already enrolled this course'
//                 });
//             }
//         }
//         catch(e)
//         {
//             return res.status(400).json({
//                 success: false,
//                 message: e.message,
//             });
//         }

        
//         //create order
//         const amount = course.Price;
//         const currency = "INR";

//         const options = {
//             amount: amount*100,
//             currency,
//             receipt: Math.random(Date.now()).toString,
//             notes: {
//                 courseId: courseId,
//                 userid
//             }
//         }

//         try{
//             //initiate the payment using razorpay
//             const PaymentResponse = await instance.orders.create(options);
//             console.log("paymentresponse is: ", PaymentResponse);
//         }
//         catch(e)
//         {
//             console.log(e);
//             return res.status(400).json({
//                 success: false,
//                 message: 'error while initiating order'
//             });
//         }

//         //return response
//         return res.status(200).json({
//             success: true,
//             message: 'initiating order successfully',
//             CourseName: course.CourseName,
//             CourseDescription: course.CourseDescription,
//             Thumbnail: course.Thumbnail,
//             OrderId: PaymentResponse.id,
//             Currency: PaymentResponse.Currency,
//             amount: PaymentResponse.amount
//         });
//     }
//     catch(e)
//     {
//         return res.status(400).json({
//             success: false,
//             message: e.message
//         });
//     }
// }


// //verify signature of razorpay and server
// exports.VerifySignature = async (req, res) => {
//     try{

//         const Signature = req.headers["x-razorpay-signature"];
        
//         const WebHookSecret = "123456";
//         const shasum = crypto.createHmac("sha256", WebHookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");

//         if(Signature === digest)
//         {
//             console.log("payment successfully");

//             const {courseId, userid} = req.body.payload.payment.entity.notes;

//             try{

//                 //Allocate user to Course
//                 const course = await Course.findByIdAndUpdate(
//                                                                 {_id: courseId}, 
//                                                                 {$push: {StudentsEnrolled: userid}},
//                                                                 {new: true}
//                 );

//                 if(!course)
//                 {
//                     return res.status(400).json({
//                         success: false,
//                         message: 'course not found'
//                     });
//                 }
                
//                 console.log("course is: ", course);

//                 //Allocate course to user
//                 const EnrolledStudents = await User.findByIdAndUpdate(
//                                                                         {_id: userid},
//                                                                         {$push: {Courses: courseId}},
//                                                                         {new: true}
//                 );

//                 console.log("Enrolled students are: ",EnrolledStudents);

//                 //Send Mail to user of confirmation of succesffully purchased course
//                 const EmailResponse = await MailSender(
//                                                         EnrolledStudents.Email,
//                                                         "Title of congratulations",
//                                                         "Description for mail"
//                 );

//                 console.log("EmailResponse is: ", EmailResponse);

//                 return res.status(200).json({
//                     success: true,
//                     message: 'Course allocated successfully and sent mail to user'
//                 });
//             }
//             catch(e)
//             {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Error during allocation of course to user'
//                 });
//             }
            
//         }
//         else
//         {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Signature Not Matched'
//             });
//         }

//     }
//     catch(e)
//     {
//         return res.status(400).json({
//             success: false,
//             message: 'Error during Signature Varification and allocation of course'
//         });
//     }
// }


