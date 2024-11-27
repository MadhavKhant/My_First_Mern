const Category = require("../models/Category");

exports.CreateCategory = async (req, res) => {
    try{

        //fetch data
        const {Name, Description} = req.body;

        if(!Name || !Description)
        {
            return res.status(400).json({
                success: false,
                message: 'All field require name and description'
            })
        }

        //create entry in db of Tag
        const CategoryDetails = await Category.create({
            Name: Name,
            Description: Description
        });

       

        return res.status(200).json({
            success: true,
            message: 'Category created successfully',
        })

    }
    catch(e){
        res.status(400).json({
            message: e.message
        })
    }
}


//Get All Tags
exports.GetAllCategories = async (req, res) => {
    try{

        const data = await Category.find({});

        return res.status(200).json({
            success: true,
            message: 'All CAtegories return successfully',
            data
        })
    }
    catch(e){
        return res.status(400).json({
            successu: false,
            message: e.message
        })
    }
}


exports.CategoryPageDetails = async (req, res) => {
    try {
            //get categoryId
            const {CategoryId} = req.body;
            //get courses for specified categoryId
            const selectedCategory = await Category.findById(CategoryId)
                                            .populate({
                                                path:"Course",
                                                match: {Status: "Published"},
                                                populate:{
                                                    path:"Instructor"
                                                }
                                            })
                                            .exec();

            //validation
            if(!selectedCategory) {
                return res.status(404).json({
                    success:false,
                    message:'Data Not Found for selectedCAtegory',
                });
            }

            if(selectedCategory.Course.length === 0){
                return res.status(400).json({
                    success: false,
                    message:'No Courses found for this Category'
                })
            }

            //get coursesfor different categories
            const differentCategories = await Category.find({_id: {$ne: CategoryId}})
                                                        .populate("Course")
                                                        .exec();

            //return response
            return res.status(200).json({
                success:true,
                data: {
                    selectedCategory,
                    differentCategories,
                },
            });

    }
    catch(error ) {
       
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}