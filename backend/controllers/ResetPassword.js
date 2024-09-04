const User = require("../models/User");
const MailSender = require("../utils/MailSender");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");


//Reset password token
exports.ResetPasswordToken = async (req, res) => {
    try{

        console.log("Entered in resetpassword token")
        //get email from req
        const {Email} = req.body;

        console.log("Email fached: ", Email)
        
        //check user from this mail, email validation
        const user = await User.findOne({Email: Email});

        console.log("User fatched: ", user);

        if(!user)
        {
            return res.status(400).json({
                success:false,
                message: `This Email: ${Email} is not Registered With Us Enter a Valid Email `,
            });
        }
        
        //generate token
        const token = crypto.randomBytes(20).toString("hex");
        
        console.log("Resetpassword generated: ", token);

        //update user by adding token and expiration time
        const UpdatedDetail = await User.findOneAndUpdate({Email: Email}, 
                                                            {
                                                                token: token,
                                                                ResetPasswordExpires: Date.now() + 5*60*1000,
                                                            },
                                                            {new: true});
        
        
        console.log("UpdatedDetail: ", UpdatedDetail);

        //create url to send via email to user
        const url = `http://localhost:3000/update-password/${token}`;

        console.log("link generated: ", url);
        
        //send mail containing url
        await MailSender(Email, "Password Reset Link", `Password Reset link: ${url}`);

        //return response
        return res.status(200).json({
            success: true,
            message:'email sent successfully for password reset So check your mail and reset your password',
        })
        

    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            success:false,
            message:'error during reset passwordtoken'
        })
    }
}



//Reset password
exports.ResetPassword = async (req, res) => {
    try{

        //fetch data from req
        const {Password, ConfirmPassword, token} = req.body;

        if(!Password || !ConfirmPassword)
        {
            return res.status(400).json({
                sucess: false,
                message: 'All field are required'
            });
        }

        //validation
        if(Password !== ConfirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:'Password and confirmpassword are not same'
            });
        }

        //get user detail from db using token
        const user = await User.findOne({token: token});

        //if no entry then invalid token
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:'Invalid token'
            })
        }

        //token time check
        if(user.ResetPasswordExpires < Date.now())
        {
            return res.status(400).json({
                success:false,
                message:'token expires please regenerate your token'
            })
        }

        //hash pass
        const hashedPassword = await bcrypt.hash(Password, 10);

        //update pass
        await User.findOneAndUpdate(
            {token: token},
            {Password: hashedPassword},
            {new: true}
        )

        //return response
        return res.status(200).json({
            success:false,
            message:'password reset successfull'
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:'error during resetpassword'
        })
    }
}
