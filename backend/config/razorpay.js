const rpay = require("razorpay");


exports.instance = new rpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET, 
});