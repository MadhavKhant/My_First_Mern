const mongoose = require("mongoose");
const MailSender = require("../utils/MailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    Email: {
        type: String
    },

    otp: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3000
    }
});


// Define a function to send emails
async function SendVerificationEmail(Email, otp) {

	try {
		const mailResponse = await MailSender(
			Email,
			"Verification Email",
			emailTemplate(otp)
		);

	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

OTPSchema.pre("save", async function(next){


    // Only send an email when a new document is created
	if (this.isNew) {
		await SendVerificationEmail(this.Email, this.otp);
	}
    next();
})


module.exports = mongoose.model("OTP", OTPSchema);