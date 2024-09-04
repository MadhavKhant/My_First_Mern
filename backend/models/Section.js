const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({

    SectionName: {
        type: String
    },

    SubSection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
            required: true,
        }
    ]

});

module.exports = mongoose.model("Section", SectionSchema);