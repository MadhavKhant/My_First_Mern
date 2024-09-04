const cloudinary = require('cloudinary').v2


exports.UploadImageToCloudinary  = async (file, folder, height, quality) => {

    console.log("entered in upload to cloudinary");
    console.log("file is : ", file);
    console.log("folder id: ", folder);
    console.log("height is: ", height);
    console.log("quality is: ", quality);

    // if(file?.path){
    //     file = {tempFilePath: file.path};
    // }

    console.log("after file: ", file);

    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";

    console.log("options: ", options);
    const dataUpload =  await cloudinary.uploader.upload(file.tempFilePath, options);

    console.log("after uploading to Cloudinary: ", dataUpload);
    return dataUpload;
}