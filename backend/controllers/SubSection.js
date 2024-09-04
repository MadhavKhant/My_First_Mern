const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { UploadImageToCloudinary } = require("../utils/ImageUploader");


exports.CreateSubSection = async (req, res) => {
    try{
        //fetch data title, timeduration, description, videourl, additionalurl
        const {Title, Description, SectionId} = req.body;
        const video = req.files.video;

        //validation
        if(!Title || !Description || !SectionId || !video)
        {
            return res.status(400).json({
                success: false,
                message: 'Data missing',
            });
        }

        //upload video to cloudinary
        const UploadDetail = await UploadImageToCloudinary(video, process.env.FOLDER_NAME);

        //create subsection
        const created_subsection = await SubSection.create({
            Title: Title,
            Description: Description,
            VideoUrl: UploadDetail.secure_url,
        });

        //add id in related section
        const UpdatedSection = await Section.findByIdAndUpdate(
            {_id: SectionId}, 
            {
                $push: {
                    SubSection: created_subsection._id,
                }
            },
            {new: true}
        ).populate("SubSection");

        //return response
        return res.status(200).json({
            success: true,
            message: 'Section created successfully',
            data:UpdatedSection,
        });
    }
    catch(e)
    {
        return res.status(400).json({
            success: false,
            message: e.message,
        });
    }
}

exports.updateSubSection = async (req, res) => {
    try {
      const { SectionId, SubSectionId, Title, Description} = req.body
      
      if (!SectionId || !SubSectionId) {
        return res.status(404).json({
          success: false,
          message: "Data missing for updation of subsection",
        })
      }
      
      const subSection = await SubSection.findById(SubSectionId);
      let flag = false;

      if (Title !== undefined) {
        subSection.Title = Title
        flag = true
      }
  
      if (Description !== undefined) {
        subSection.Description = Description
        flag=true
      }

      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await UploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.VideoUrl = uploadDetails.secure_url;
        flag = true;
      }

  
      await subSection.save();

      if(flag){
        const updatedSection = await Section.findByIdAndUpdate(
          SectionId,
          {
            $set: {
              "SubSections.$[elem]": subSection,
            },
          },
          {new:true}
        ).populate({
          path:"SubSection"
        }).exec(); 

        return res.status(200).json({
          success:true,
          message:"Updated subSection succcessfully",
          data:updatedSection
        })
      }

      const sectionOld = await Section.findById(SectionId); 

      return res.json({
        success: true,
        message: "Section updated successfully with no changes",
        data:sectionOld
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  
  exports.DeleteSubSection = async (req, res) => {
    try {
      const { SubSectionId, SectionId } = req.body;

      if(!SubSectionId || !SectionId){
        return res.status(400).json({
          success:false,
          message:"Data missing while deletion of subsection"
        })
      }

      //delete subsection from section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: SectionId },
        {
          $pull: {
            SubSection: SubSectionId,
          },
        },
        {new:true}
      ).populate({
        path:"SubSection"
      }).exec();

      //delete entry of subsection
      const subSection = await SubSection.findByIdAndDelete({ _id: SubSectionId })
  
      if (!subSection) 
      {
        return res.status(404).json({ 
          success: false, 
          message: "SubSection not found" 
        });
      }
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data:updatedSection
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }


  