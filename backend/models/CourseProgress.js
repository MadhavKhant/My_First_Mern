const mongoose = require("mongoose");


const CourseProgressSchema = new mongoose.Schema({

    CourseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },

    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    CompletedVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection"
        }
    ]
});

module.exports = mongoose.model("CourseProgress", CourseProgressSchema);