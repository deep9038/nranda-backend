const addOnItemModel = require('../Model/addOnItem_Model');

// addOnItem_post
exports.addOnItem_post = (req, res) => {

    const { addOnItemImage, addOnItemName, addOnItemPrice } = req.body;
    // console.log('req.body',req.body);
    const lowerCase = addOnItemName.toLowerCase();
    // console.log(req.files);
    // if (req.files&&req.files.length && req.files.addOnItemImage !=null) {
    addOnItemModel.findOne({ addOnItemName: lowerCase }, (error, findAddOnItemData) => {
        if (!findAddOnItemData) {
            new addOnItemModel({
                addOnItemImage: req.files.addOnItemImage,
                addOnItemName: lowerCase,
                addOnItemPrice: req.body.addOnItemPrice

            }).save().then(addAddOnItem => {
                // console.log('addAddOnItem',addAddOnItem);
                return res.status(200).json({
                    status: 'success',
                    result: addAddOnItem,
                    message: "addOnItem Data Submitted"
                });
            }).catch(err => {
                console.log('addAddOnItem ERROR : ', err);
                return res.status(400).json({
                    status: 'failed',
                    message: "addOnItem Data can't Submitted"
                });
            })

        } else {
            // console.log('addOnItem Data Allready Exsist', findAddOnItemData._id);
            const ID = findAddOnItemData._id;
            addOnItemModel.findById({ _id: ID }).then(addOnItemFind => {
                // console.log('addOnItemFind', addOnItemFind);
                if (addOnItemFind.status == '0') {
                    addOnItemModel.findByIdAndUpdate({ _id: ID }, { status: 1 }).then(AddAddOnItem => {
                        return res.status(200).json({
                            status: 'Success',
                            message: "addOnItem Data Submitted"
                        });
                    }).catch(err => {
                        console.log('AddOnItem Data Submitted Failed ERROR :', err);
                        return res.status(400).json({
                            status: 'Failed',
                            message: "AddOnItem Data Submitted Failed"
                        });
                    })
                } else {
                    return res.status(400).json({
                        status: 'failed',
                        message: "addOnItem Data Allready Exsist"
                    });
                }
            })
        }
    })
    // }else{
    //     return res.status(400).json({
    //         status: 'failed',
    //         message: "Please Select Image"
    //     });
    // }
}

// GET addOnItem
exports.addOnItem = (req, res) => {
    addOnItemModel.find().then(addOnItemResults => {
        // console.log(addOnItemResults);
        return res.status(200).json({
            status: 'success',
            result: addOnItemResults,
            message: "addOnItem Data Recive"
        });
    }).catch(err => {
        console.log('addonItemResults ERROR ', err);
        return res.status(400).json({
            status: 'Failed',
            message: "addOnItem Data ERROR"
        });
    })
}