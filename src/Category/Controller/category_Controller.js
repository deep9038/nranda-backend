const categoryModel = require('../Model/category_Model');


// addCategory_post
exports.addCategory_post=(req,res)=>{
    // console.log(req.files);
    
    const {categoryImage,categoryName } = req.body;
    console.log('req.body',req.body);
    const lowerCase = categoryName.toLowerCase();
    console.log(req.files);
    if (req.files.categoryImage !=null) {
        categoryModel.findOne({ categoryName: lowerCase }, (error, findcategoryData)=>{
            if (!findcategoryData) {
                new categoryModel({
                    categoryImage: req.files.categoryImage,
                    categoryName: lowerCase,
                    
                }).save().then(addcategory => {
                    console.log('addcategory',addcategory);
                    return res.status(200).json({
                        status: 'success',
                        result: addcategory,
                        message: "category Data Submitted"
                    });
                }).catch(err => {
                    console.log('addcategory ERROR : ', err);
                    return res.status(400).json({
                        status: 'failed',
                        message: "category Data can't Submitted"
                    });
                })
    
            } else {
                // console.log('category Data Allready Exsist',findcategoryData);
                return res.status(400).json({
                    status: 'failed',
                    message: "category Data Allready Exsist"
                });
            }
        })
    }else{
        return res.status(400).json({
            status: 'failed',
            message: "Please Select Image"
        });
    }
}

// addCategory
exports.addCategory=(req,res)=>{
    categoryModel.find().then(categoryResults=>{
        // console.log(categoryResults);
        return res.status(200).json({
            status: 'success',
            result: categoryResults,
            message: "category Data"
        });
    })
}