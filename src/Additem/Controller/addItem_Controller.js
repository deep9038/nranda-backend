const addItemModel = require('../Model/addItem_Model');

// ADD ITEM GET
exports.Items = (req,res)=>{
    addItemModel.find().populate('itemCategory').exec((err,ItemsDetails)=>{
        if(!err){
            // console.log('Items get successfully',ItemsDetails);
            return res.status(200).json({
                status: 'success',
                result: ItemsDetails,
                message: "Items get successfully"
            });

        }else{
            console.log('Items get Failed Error : ',err);
            return res.status(400).json({
                status: 'Failed',
                message: "Items get Failed"
            });
        }
    })
}

// ADD ITEM POST
exports.addItem_post = (req, res) => {
    const {Image,itemName } = req.body;
    const lowerCase = itemName.toLowerCase();
    console.log(req.files);
    if (req.files.Image !=null) {
        addItemModel.findOne({ itemName: lowerCase }, (error, findItemData)=>{
            console.log('findItemData',req.body);
            console.log('findItemData',req.body.itemAddOn);
            if (!findItemData) {
                new addItemModel({
                    Image: req.files.Image,
                    itemName: lowerCase,
                    itemCategory: req.body.itemCategory,
                    itemAddOn: req.body.itemAddOn,
                    itemType: req.body.itemType,
                    itemPrice: req.body.itemPrice
                }).save().then(addItem => {
                    console.log('addItem',addItem);
                    return res.status(200).json({
                        status: 'success',
                        result: addItem,
                        message: "Item Data Submitted"
                    });
                }).catch(err => {
                    console.log('addItem ERROR : ', err);
                    return res.status(400).json({
                        status: 'failed',
                        message: "Item Data can't Submitted"
                    });
                })
    
            } else {
                // console.log('Item Data Allready Exsist',findItemData);
                return res.status(400).json({
                    status: 'failed',
                    message: "Item Data Allready Exsist"
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


// item With Category
exports.itemOfCategory =(req,res)=>{
    const ID = req.params.id
    // console.log(ID);
    addItemModel.find({ itemCategory: ID }).then(itemOfCategory => {
        console.log(itemOfCategory);
        return res.status(200).json({
            status: 'success',
            result: itemOfCategory,
            message: "Item With Category"
        });
        
    }).catch(err=>{
        return res.status(400).json({
            status: 'failed',
            message: "Please Select Image"
        });
    })
}