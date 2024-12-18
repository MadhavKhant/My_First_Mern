const nodemailer = require("nodemailer");

const MailSender = async (email, title, body) => {
    try{
        
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from: `StudyNotion || Madhav Khant <${process.env.MAIL_USER}>`, // sender address
            to: email, // list of receivers
            subject: title, // Subject line
            html: body // html body
        });

        return info;
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = MailSender;