const mongoose = require("mongoose");

const RatingAndReviewSchema = new mongoose.Schema({

    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    Rating: {
        type: Number
    },

    Review: {
        type: String
    },

    Course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        index: true
    }

});

module.exports = mongoose.model("RatingAndReview", RatingAndReviewSchema);