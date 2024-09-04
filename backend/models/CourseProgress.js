const mongoose = require("mongoose");

const CourseProgressSchema = new mongoose.Schema({

    Courseid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },

    CompletedVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subsection"
        }
    ]
});

module.exports = mongoose.model("CourseProgress", CourseProgressSchema);