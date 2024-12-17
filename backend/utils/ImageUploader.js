const cloudinary = require('cloudinary').v2


exports.UploadImageToCloudinary  = async (file, folder, height, quality) => {

    // if(file?.path){
    //     file = {tempFilePath: file.path};
    // }
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    const dataUpload =  await cloudinary.uploader.upload(file.tempFilePath, options);
    return dataUpload;
}