const mongoose = require("mongoose");

const SubSectionSchema = new mongoose.Schema({
    Title:{
        type: String,
    },

    TimeDuration: {
        type: String
    },

    Description: {
        type: String
    },

    VideoUrl: {
        type: String
    },
});

module.exports= mongoose.model("SubSection", SubSectionSchema);