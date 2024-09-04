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

        console.log(CategoryDetails);

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

        const alltags = await Category.find({}, {Name: true, Description: true});

        return res.status(200).json({
            success: true,
            message: 'All CAtegories return successfully',
            alltags
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
                                            .populate("Course")
                                            .exec();
            //validation
            if(!selectedCategory) {
                return res.status(404).json({
                    success:false,
                    message:'Data Not Found',
                });
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
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}