const mongoose = require("mongoose");
require("dotenv").config();

// Function to connect to MongoDB
exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        
    })
    .then(() => {
        ("db connected successfully"); // Log success message
    })
    .catch((error) => {
        console.error("db connection failed"); // Log failure message
        console.error(error); // Log the error details
        process.exit(1); // Exit the process with failure
    });
}
