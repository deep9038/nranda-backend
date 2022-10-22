const categoryModel = require('../Model/category_Model');
const itemModel = require('../../Additem/Model/addItem_Model');


// CATEGORY DELETE
exports.categoryDelete = (req, res) => {
    const ID = req.params.id
    // console.log(ID);
    itemModel.find({ itemCategory: ID }).then(itemOfCategory => {
        // console.log(itemOfCategory);
        for (let i = 0; i < itemOfCategory.length; i++) {
            // console.log('itemOfCategory[i]', itemOfCategory[i]._id);
            var Iid = itemOfCategory[i]._id;
            itemModel.deleteOne({ _id: Iid }).then(result => {
                // console.log('result',result);
            })

        }

        categoryModel.deleteOne({ _id: ID }).then(deleteCategory => {

            return res.status(200).json({
                status: 'Success',
                result: deleteCategory,
                message: "Category Deleted"
            });
        }).catch(err => {
            console.log('DELETE CATEGORY ERROR :', err);
            return res.status(400).json({
                status: 'Failed',
                message: "Category Deleted Failed"
            });
        })
    })

}



// activetion Status Category

exports.activetionStatusCategory = async (req, res) => {
    const ID = req.params.id
    // console.log(ID);
    const activetionStatus = await categoryModel.findById({ _id: ID });


    if (activetionStatus.Active === true) {
        categoryModel.findByIdAndUpdate({ _id: ID }, { Active: false }).then(activetionStatusCategory => {

            itemModel.find({ itemCategory: ID }).then(itemOfCategory => {
                // console.log(itemOfCategory);
                for (let i = 0; i < itemOfCategory.length; i++) {
                    // console.log('itemOfCategory[i]', itemOfCategory[i]._id);
                    var Iid = itemOfCategory[i]._id;
                    itemModel.findByIdAndUpdate({ _id: Iid }, { Active: false }).then(result => {
                        // console.log('result',result);
                    })

                }
            })


            return res.status(200).json({
                status: 'Success',
                // result: activetionStatusCategory,
                message: "Update category Activetion Status True to False  "
            });
        })
    }

    if (activetionStatus.Active === false) {
        categoryModel.findByIdAndUpdate({ _id: ID }, { Active: true }).then(activetionStatusCategory => {


            itemModel.find({ itemCategory: ID }).then(itemOfCategory => {
                // console.log(itemOfCategory);
                for (let i = 0; i < itemOfCategory.length; i++) {
                    // console.log('itemOfCategory[i]', itemOfCategory[i]._id);
                    var Iid = itemOfCategory[i]._id;
                    itemModel.findByIdAndUpdate({ _id: Iid }, { Active: true }).then(result => {
                        // console.log('result',result);
                    })

                }
            })


            return res.status(200).json({
                status: 'Success',
                // result: activetionStatusCategory,
                message: "Update category Activetion Status False to True"
            });
        })
    }

}


// EDIT CATEGORY EDIT
exports.categoryEdit = (req,res)=>{
    const ID = req.params.id
    categoryModel.findById({ _id: ID }).then(categoryEditData => {
        // console.log(categoryEditData);
        return res.status(200).json({
            status: 'Success',
            result: categoryEditData,
            message: "category edit Data"
        });
    }).catch(err => {

        console.log('category edit Data Failed ERROR: ', err);
        return res.status(400).json({
            status: 'Failed',
            message: "category edit Data Failed"
        });
    })
}

// CATEGORY UPDATE
exports.categoryUpdate_post = (req, res) => {
    const categoryUpdateId = req.body._id;
    const { categoryImage, categoryName } = req.body;

    const lowerCase = categoryName.toLowerCase();

    // console.log('req.body ID', categoryUpdateId);
    // const img = req.files
    // console.log('img',img);
    categoryModel.findById({ _id: categoryUpdateId }).then(result => {
        // console.log(result);
        if (req.files.categoryImage != null) {

            result.categoryImage = req.files.categoryImage
        }
        result.categoryName = lowerCase,

            result.save((err, data) => {
                if (!err) {
                    console.log('update category Data');
                    return res.status(200).json({
                        status: 'Success',
                        result: data,
                        message: "update category Data"
                    });
                } else {
                    console.log(`update category Data ERROR:${err}`);
                    return res.status(400).json({
                        status: 'Failed',
                        message: "update category Data ERROR"
                    });
                }
            })

    })
}