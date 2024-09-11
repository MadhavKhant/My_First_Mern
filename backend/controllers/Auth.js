const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MailSender = require("../utils/MailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

require("dotenv").config();

//sent otp
exports.SendOTP = async (req, res) => {
    try
    {
		console.log("enterd in send otp controllers")
        //fetch email from request body
        const {Email} = req.body;

        //check if user already exist or not
        const CheckUserPresent = await User.findOne({Email: Email});

        if(CheckUserPresent)
        {
            return res.status(400).json({
                success: false,
                message: 'User already registered'
            })
        }

        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        console.log("OTP generated: ", otp);

        // //check otp is unique or not
        // const result = await OTP.findOne({otp: otp});

        // while(result)
        // {
        //     otp = otpGenerator.generate(6, {
        //         upperCaseAlphabets: false,
        //         lowerCaseAlphabets: false,
        //         specialChars: false
        //     });
        //     result = await OTP.findOne({otp: otp});
        // }

        const payload = {Email, otp};

        //create an entry for OTP
        const otpBody = await OTP.create(payload);
        console.log("Otp body is:, ", otpBody);

        res.status(200).json({
            success: true,
            message:'OTP sent successfully',
            otp,
        });

    }
    catch(error)
    {
        console.log("error during sending otp",error);
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}


// //signup
// exports.Signup = async (req, res) => {
//     try{
//         //fetch data from req
//         const {

//             FirstName,
//             LastName,
//             Email,
//             Password,
//             ConfirmPassword,
//             AccountType,
//             otp

//         } = req.body;

//         //check user already exist or not
//         const existing = await User.findOne({Email});
//         console.log("/n Existing User: ", existing);

//         if(existing)
//         {
//             return res.status(400).json({
//                 success: false,
//                 message:'User already Exist with this mail'
//             })
//         }

//         //check all entries filled or not
//         if(!FirstName || !LastName || !Email || !Password || !ConfirmPassword || !otp)
//         {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fied are required"
//             });
//         }

//         //check pass word and confimedpassword are same or not
//         if(Password !== ConfirmPassword)
//         {
//             return res.status(400).json({
//                 success: false,
//                 message:'Password and confimed password are not same'
//             })
//         }

//         console.log("/n Password and confirmpassword matched");

//         const Allotp = await OTP.find({Email});
//         console.log("\n \n All otp: ", Allotp);
//         const response = await OTP.find({ email: Email }).sort({ createdAt: -1 }).limit(1);
//         console.log("\n \n  Response : ", response);

//         //validate otp
//         if(response.length == 0)
//         {
//             return res.status(400).json({
//                 success: false,
//                 message: "OTP not found"
//             }); 
//         }
//         else if(otp !== response[0].otp)
//         {
//             return res.status(400).json({
//                 success: false,
//                 message: "OTP is not same"
//             });
//         }

//         //hash password
//         const hashedPassword = await bcrypt.hash(Password, 10);


//         const profileDetaildoc = await Profile.create({
//             Gender: null,
//             Dob: null,
//             ContactNumber: null,
//             About: null 
//         }) 

//         console.log("\n Profile created null");

//         // Create the user
// 		let approved = "";
// 		approved === "Instructor" ? (approved = false) : (approved = true);

//         //store User
//         const user = await User.create({
//             Firstname: FirstName,
//             Lastname: LastName,
//             Email: Email,
//             Password: hashedPassword,
//             AdditionalDetail: profileDetaildoc._id,
//             Image: `https://api.dicebear.com/5.x/initials/svg?seed=${FirstName} ${LastName}`,
//             AccountType: AccountType,
//             Approved: approved,
//         });

//         console.log("\n User created: ", user);

//         return res.status(200).json({
//             success: true,
//             message: 'User registed successfully',
//             user
//         })

//     }
//     catch(error){
//         console.log("error during Signup", error);
//         return res.status(400).json({
//             success: false,
//             message: 'User can not registered please try again'
//         })
//     }
// }


exports.Signup = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			FirstName,
			LastName,
			Email,
			Password,
			ConfirmPassword,
			AccountType,
			ContactNumber,
			otp,
		} = req.body;
		// Check if All Details are there or not
		if (
			!FirstName ||
			!LastName ||
			!Email ||
			!Password ||
			!ConfirmPassword ||
			!otp
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}

        // Check if user already exists
		const existingUser = await User.findOne({ Email: Email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Check if password and confirm password match
		if (Password !== ConfirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

        // const allotp = await OTP.findOne({Email});
        // console.log("\n Allotps :", allotp);

		// Find the most recent OTP for the email
		const response = await OTP.find({ Email }).sort({ createdAt: -1 }).limit(1);
		console.log("\n Response is :",response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is wrong",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(Password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			Gender: null,
			Dob: null,
			About: null,
			ContactNumber: null,
		});
		const user = await User.create({
			FirstName: FirstName,
			LastName: LastName,
			Email: Email,
			ContactNumber: ContactNumber,
			Password: hashedPassword,
			AccountType: AccountType,
			Approved: approved,
			AdditionalDetail: profileDetails._id,
			Image: `https://api.dicebear.com/5.x/initials/svg?seed=${FirstName} ${LastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

//login

exports.Login = async (req, res) => {
    try{

        //fetch data from req
        const {Email, Password} = req.body;

        //validate data
        if(!Email || !Password)
        {
            return res.status(400).json({
                success: false,
                message: 'All field are require'
            })
        }

        //check user exist or not usgin email
        const user = await User.findOne({Email: Email});

        if(!user)
        {
            return res.status(400).json({
                success: false,
                message: 'User is not exist'
            })
        }

        //check password is right or wrong if right then create token
        if(await bcrypt.compare(Password, user.Password))
        {
            console.log("/n password matched");
            const payload = {
                Email: user.Email,
                id: user._id,
                AccountType: user.AccountType
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "30h",
            });
            user.token = token;

            //console.log("password of user is: ", userexist.Password);
            user.Password = undefined;
            const option = {
                expires: new Date(Date.now() + 3*24*60*60*1000) //3 days
            }

            //create cookie and send response
            res.cookie("token", token, option).status(200).json({
                success: true,
                token,
                user,
                message: "logged in successfully"
            })
        }
        else
        {
            return res.status(400).json({
                success: false,
                message: 'your password entered is wrong please try again'
            })
        }
        

    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: 'error during login'
        })
    }
}


// Controller for Changing Password
exports.ChangePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { OldPassword, NewPassword, ConfirmNewPassword } = req.body;
		
        if(!OldPassword || !NewPassword || !ConfirmNewPassword)
        {
            return res.status(400).json({
                success: false,
                message: 'All field requires OldPassword, NewPassword, ConfirmNewPassword'
            });
        }

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(OldPassword, userDetails.Password);

		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res.status(401).json({ 
                success: false, 
                message: "The Oldpassword is incorrect" 
            });
		}

		// Match new password and confirm new password
		if (NewPassword !== ConfirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(NewPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ Password: encryptedPassword },
			{ new: true }
		);

        console.log("sending mail as your password is updateed");
		// Send notification email
		try {
			const emailResponse = await MailSender(
				updatedUserDetails.Email,
				passwordUpdated(
					updatedUserDetails.Email,
					`Password updated successfully for ${updatedUserDetails.FirstName} ${updatedUserDetails.LastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};