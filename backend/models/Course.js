const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    CourseName: {
        type: String,
        required: true
    },

    CourseDescription: {
        type: String,
        required: true
    },

    Instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    WhatYouWillLearn: {
        type: String
    },

    CourseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        },
    ],

    RatingAndReview: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview"
        },
    ],

    Price: {
        type: Number,
        required: true
    },

    Thumbnail: {
        type: String,
    },

    Tag: {
        type: [String],
        required: true,
    },

    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },

    StudentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],

    Instructions: {
        type: [String],
    },

    Status: {
        type: String,
        enum: ["Draft", "Published"],
    },

}, {timestamps:true});

module.exports = mongoose.model("Course", CourseSchema);