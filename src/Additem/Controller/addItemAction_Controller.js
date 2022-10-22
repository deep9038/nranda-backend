const addItemModel = require('../Model/addItem_Model');

// item Delete
exports.itemDelete = (req, res) => {
    const ID = req.params.id
    // console.log(ID);
    addItemModel.deleteOne({ _id: ID }).then(deleteItem => {
        return res.status(200).json({
            status: 'Success',
            // result: deleteItem,
            message: "Item Deleted"
        });
    }).catch(err => {
        console.log('DELETE ERROR :', err);
        return res.status(400).json({
            status: 'Failed',
            message: "Item Deleted Failed"
        });
    })
}


// itemEditData
exports.itemEditData = (req, res) => {
    const ID = req.params.id
    addItemModel.findById({ _id: ID }).then(itemEditData => {
        // console.log(itemEditData);
        return res.status(200).json({
            status: 'Success',
            result: itemEditData,
            message: "Item edit Data"
        });
    }).catch(err => {

        console.log('Item edit Data Failed ERROR: ', err);
        return res.status(400).json({
            status: 'Failed',
            message: "Item edit Data Failed"
        });
    })
}


// itemUpdate_post
exports.itemUpdate_post = (req, res) => {
    const itemUpdateId = req.body._id;
    const {Image,itemName } = req.body;

    const lowerCase = itemName.toLowerCase();

    // console.log('req.body', itemUpdateId);
    const img = req.files
    // console.log('img',img);
    addItemModel.findById({ _id: itemUpdateId }).then(result => {
        // console.log(result);
            if (req.files.Image !=null) {

                result.Image = req.files.Image
            }
            result.itemName = lowerCase,
            result.itemCategory = req.body.itemCategory,
            result.itemAddOn = req.body.itemAddOn,
            result.itemType = req.body.itemType,
            result.itemPrice = req.body.itemPrice 


        result.save((err,data)=>{
            if(!err){
                console.log('update Item Data');
                return res.status(200).json({
                    status: 'Success',
                    result: data,
                    message: "update Item Data"
                });
            }else{
                console.log(`update Item Data ERROR:${err}`);
                return res.status(400).json({
                    status: 'Failed',
                    message: "update Item Data ERROR"
                });
            }
        })

    })
}


// ACTIVATION STATUS
exports.activetionStatusItem=async(req,res)=>{
    const ID = req.params.id
    // console.log(ID);
    const activetionStatus =await addItemModel.findById({_id:ID});


    if(activetionStatus.Active===true){
        addItemModel.findByIdAndUpdate({ _id: ID },{Active:false}).then(activetionStatusItem => {
            return res.status(200).json({
                status: 'Success',
                // result: activetionStatusItem,
                message: "Update Item Activetion Status True to False  "
            });
        })
    }

    if(activetionStatus.Active===false){
        addItemModel.findByIdAndUpdate({ _id: ID },{Active:true}).then(activetionStatusItem => {
            return res.status(200).json({
                status: 'Success',
                // result: activetionStatusItem,
                message: "Update Item Activetion Status False to True"
            });
        })
    }

    // addItemModel.findByIdAndUpdate({ _id: ID },{Active:false}).then(activetionStatusItem => {
    //     return res.status(200).json({
    //         status: 'Success',
    //         // result: activetionStatusItem,
    //         message: "Update Activetion Status Item  "
    //     });
    // }).catch(err => {
    //     console.log('Activetion Status Item Failed ERROR :', err);
    //     return res.status(400).json({
    //         status: 'Failed',
    //         message: "Activetion Status Item Failed"
    //     });
    // })
}

