const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        FirstName:{
            type: String,
            required: true,
            trim: true
        },

        LastName:{
            type: String,
            required: true,
            trim: true
        },

        Email:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        Password:{
            type: String,
            required: true,
        },

        AccountType:{
            type: String,
            enum: ["Admin", "Instructor", "Student"],
            required: true
        },

        Active: {
            type: Boolean,
            default: true,
        },

        Approved: {
            type: Boolean,
            default: true,
        },

        AdditionalDetail:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        },

        Courses:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }
        ],

        Image: {
            type: String,
            required: true
        },

        CourseProgress:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CourseProgress"
            }
        ],

        token:{
            type: String,
        },

        ResetPasswordExpires:{
            type: Date,
        }
    },
    
    // Add timestamps for when the document is created and last modified
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);