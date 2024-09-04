const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({

    Gender: {
        type: String,
    },

    Dob: {
        type: String
    },

    About: {
        type: String,
        trim: true
    },

    ContactNumber : {
        type: Number,
        trim: true
    }

});

module.exports = mongoose.model("Profile", ProfileSchema);