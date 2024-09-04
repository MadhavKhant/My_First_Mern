require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
    try{

        console.log("\nentered in middleware auth");
        
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        console.log("\nToken is: ", token);

        //if token is missing then return response
        if(!token)
        {
            return res.status(400).json({
                success: false,
                message: 'Token is missing'
            })
        }

        //verify of token
        try{
            console.log("Verifying token");
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log("\ndecode is : ", decode);
            req.user = decode;
        }
        catch(e)
        {
            return res.status(400).json({
                success: false,
                message: 'token is invalid'
            })
        }
        
        next();

    }
    catch(e)
    {
        return res.status(400).json({
            success: false,
            message: 'something went wrong during validating token in auth middleware'
        })
    }
}


//isStudent
exports.isStudent = async (req, res, next) => {
    try{

        if(req.user.AccountType !== "Student")
        {
            return res.status(400).json({
                success: false,
                message: 'This is protected route for students only'
            })
        }

        next();
    }
    catch(e)
    {
        return res.status(400).json({
            success: false,
            message: 'Student role can not be varified'
        })
    }
}


//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{

        if(req.user.AccountType !== "Instructor")
        {
            return res.status(400).json({
                success: false,
                message: 'This is protected route for Instructor only'
            })
        }

        next();
    }
    catch(e)
    {
        return res.status(400).json({
            success: false,
            message: 'Instructor role can not be varified'
        })
    }
}



//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{

        if(req.user.AccountType !== "Admin")
        {
            return res.status(400).json({
                success: false,
                message: 'This is protected route for Admin only'
            })
        }

        next();
    }
    catch(e)
    {
        return res.status(400).json({
            success: false,
            message: 'Admin role can not be varified'
        })
    }
}