const cloudinary = require("cloudinary").v2;

exports.CloudinaryConnect = (req, res) => {
    try{

        cloudinary.config({
            //!    ########   Configuring the Cloudinary to Upload MEDIA ########
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        })

    }
    catch(e)
    {
        console.log(e);
        return res.status(400).json({
            sucess: false,
            message: e.message,
        })
    }
}