const Profile = require("../models/Profile");
const User = require("../models/User");
const { UploadImageToCloudinary } = require("../utils/ImageUploader");
const Course = require("../models/Course");

exports.UpdateProfile = async (req, res) => {
    try{

        console.log("\n\nEntered in Updated Profile");

        //get data ans UserId
        const {Dob="", Gender="", About="", ContactNumber=""} = req.body;
        const userid = req.user.id;

        //validation of data
        if(!ContactNumber || !Gender || !userid)
        {
            return res.status(400).json({
                success: false,
                message: 'Data missing',
            });
        }

        console.log("data validation success");

        //find profile
        const userDetail = await User.findById(userid);
        const profileId = userDetail.AdditionalDetail;
        const ProfileData = await Profile.findById(profileId);

        console.log("userdetail profileid profiledata fetched");

        //update profile
        ProfileData.Dob = Dob;
        ProfileData.Gender = Gender;
        ProfileData.About = About;
        ProfileData.ContactNumber = ContactNumber;

        console.log("Object created");

        await ProfileData.save(); 

        //return response
        return res.status(200).json({
            success: true,
            message:'Profile Update successfully',
            ProfileData,
        })

    }
    catch(e)
    {
        console.log(e);
        return res.status(400).json({
            success: false,
            message: e.message,
        });
    }
}


exports.DeleteAccount = async (req, res) => {
    try{

        console.log("\n\n\n entered in delete account \n\n\n");
        ///get id
        const id = req.user.id;

        console.log("user in deleteaccount: ", req.user);
        console.log("userin in deleteaccount: ", req.user.id);


        //validation
        const userDetail = await User.findById(id);

        if(!userDetail)
        {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }

        //delete profile 
        if(userDetail.AdditionalDetail){
          await Profile.findByIdAndDelete({_id: userDetail.AdditionalDetail});
        }

        //---------------------------------------------------HW  remove enrolled student from enrolled courses----------------------
        await Promise.all(userDetail.Courses.map(async (Courseid) => {
          await Course.findByIdAndUpdate(Courseid, {$pull: {StudentsEnrolled: id}});
        }));

        //delete user
        await User.findByIdAndDelete({_id: id});

        //return response
        return res.status(200).json({
            success: true,
            message: 'Delete account successfully',
        });

    }
    catch(e)
    {
        return res.status(400).json({
            success: false,
            message: e.message,
        });
    }
}


exports.GetUserDetails = async (req, res) => {
    try{

        //get id of user
        const id = req.user.id;

        //get user details
        const userdetails = await User.findById(id).populate("AdditionalDetail").exec();

        //return response
        return res.status(200).json({
            success: true,
            message: 'user data fatched successfully',
            data: userdetails
        });

    }
    catch(e)
    {
        return res.status(400).json({
            success: false,
            message: e.message,
        });
    }
}

exports.UpdateDisplayPicture = async (req, res) => {
    try {

      console.log("\n\nEntered in UpdateDisplayPicture\n");


      const displayPicture = req.files.displayPicture;
      const userId = req.user.id
      const image = await UploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )

      console.log("displaypicture: ", displayPicture);

      console.log("\nImage is: ", image);
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      );

      console.log("\n Updated Profile: ", updatedProfile);

      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      });

    } catch (error) {
      console.log("error is: ", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.GetEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({_id:userId})
                                    .populate({
                                      path:"Courses",
                                      populate:{
                                        path:"CourseContent",
                                        populate:{
                                          path:"SubSection"
                                        }
                                      }
                                    }).exec();


      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.Courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};