 const mongoose = require("mongoose");

 const CategorySchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },

    Description: {
        type: String
    },

    Course: [
        {   
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        },
    ],
 });

 module.exports = mongoose.model("Category", CategorySchema);