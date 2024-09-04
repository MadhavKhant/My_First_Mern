const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection")

exports.CreateSection = async (req, res) => {
    try{

        //fetch details
        const {SectionName, CourseId} = req.body;

        //validation
        if(!SectionName || !CourseId)
        {
            return res.status(400).json({
                success: false,
                message: 'Missing All entries',
            });
        }

        //create Section
        const NewSection = await Section.create({
            SectionName
        });

        //Add id of Created Section in the related Course
        const data = await Course.findByIdAndUpdate(CourseId, 
            {
                $push:{
                    CourseContent: NewSection._id
                }
            },
            {new: true})
            .populate({
				path: "CourseContent",
				populate: {
					path: "SubSection",
				},
			})
			.exec();
            
            

        //Return response
        return res.status(200).json({
            success: true,
            message: 'New Section created Successfully',
            data,
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


//update section 
exports.UpdateSection = async (req, res) => {
    try{

        //fetch new name
        const {SectionName, SectionId, CourseId} = req.body;

        //data validation
        if(!SectionName || !SectionId || !CourseId)
        {
            return res.status(400).json({
                success: false,
                message: 'All fields requires in UpdateSection',
            });
        }

        //update Section
        const updatedsection = await Section.findByIdAndUpdate(SectionId, {SectionName: SectionName}, {new: true});

        //Update corresponding Course
        const data = await Course.findById(CourseId)
                                    .populate({
                                        path:"CourseContent",
                                        populate:{
                                            path:"SubSection"
                                        }
                                    }).exec();

                         

        //return updatedSection
        return res.status(200).json({
            success: true,
            message: 'Section updated successfully',
            data: data
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


//Delete Section
exports.DeleteSection = async (req, res) => {
    try{

        //fetch id to delete
        const {SectionId, CourseId} = req.body;
        //validation
        if(!SectionId || !CourseId)
        {
            return res.status(400).json({
                success: false,
                message: 'Data missing',
            });
        }
        
        //delete from course
        await Course.findByIdAndUpdate(CourseId, {
            $pull:{
                CourseContent:SectionId
            }
        })

        //delete sub section
		await SubSection.deleteMany({_id: {$in: Section.SubSection}});
        const data = await Course.findById(CourseId)
                                        .populate({
                                            path:"CourseContent",
                                            populate:{
                                                path:"SubSection"
                                            }
                                        }).exec();


        //delete that section

        const UpdatedSection = await Section.findByIdAndDelete(SectionId, {new:true});



        res.status(200).json({
			success: true,
			message: "Section deleted",
            data:data
		});

    }
    catch(e)
    {
        console.error("Error deleting section:", e);
        return res.status(400).json({
            success: false,
            message: e.message,
        });
    }
}