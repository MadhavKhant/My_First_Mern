const mongoose = require("mongoose")
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress")

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body
  const userId = req.user.id

  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById({_id:subsectionId})
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" })
    }

    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      CourseId: courseId,
      UserId: userId,
    })

    if (!courseProgress) {
      // If course progress doesn't exist, create a new one
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      })
    }

    // If course progress exists, check if the subsection is already completed
    if (courseProgress.CompletedVideos.includes(subsectionId)) {
        return res.status(400).json({ error: "Subsection already completed" })
    }

      // Push the subsection into the completedVideos array
      courseProgress.CompletedVideos.push(subsectionId)
    

    // Save the updated course progress
    await courseProgress.save()

    return res.status(200).json({ message: "Course progress updated" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}


// exports.getProgressPercentage = async (req, res) => {
//     const { courseId } = req.body
//     const userId = req.user.id
  
//     if (!courseId) {
//       return res.status(400).json({ error: "Course ID not provided." })
//     }
  
//     try {
//       // Find the course progress document for the user and course
//       let courseProgress = await CourseProgress.findOne({
//         CourseId: courseId,
//         UserId: userId,
//       })
//         .populate({
//           path: "CourseId",
//           populate: {
//             path: "CourseContent",
//           },
//         })
//         .exec()
  
//       if (!courseProgress) {
//         return res
//           .status(400)
//           .json({ error: "Can not find Course Progress with these IDs." })
//       }
//       console.log(courseProgress, userId)
//       let lectures = 0
//       courseProgress.CourseId.CourseContent?.forEach((sec) => {
//         lectures += sec.SubSection.length || 0
//       })
  
//       let progressPercentage =
//         (courseProgress.CompletedVideos.length / lectures) * 100
  
//       // To make it up to 2 decimal point
//       const multiplier = Math.pow(10, 2)
//       progressPercentage =
//         Math.round(progressPercentage * multiplier) / multiplier
  
//       return res.status(200).json({
//         data: progressPercentage,
//         message: "Succesfully fetched Course progress",
//       })
//     } catch (error) {
//       console.error(error)
//       return res.status(500).json({ error: "Internal server error" })
//     }
//   }