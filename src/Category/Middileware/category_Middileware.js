
const addCategoryModel = require('../Model/category_Model');


exports.inputCategoryCheck = (req, res, next) => {
    const { categoryImage, categoryName} = req.body;
    // console.log('middileware',req.body);
    
    if (!categoryName) {
        return res.status(400).json({
            status: 400,
            message: "Please Enter Category Name"
        });
    }
    
    next();
}


