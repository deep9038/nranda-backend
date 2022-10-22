const addOnItemModel = require('../Model/addOnItem_Model');


exports.deleteAddOnItem=(req,res)=>{
    const ID = req.params.id
    // console.log(ID);
    addOnItemModel.findByIdAndUpdate({ _id: ID },{status:0}).then(deleteAddOnItem => {
        return res.status(200).json({
            status: 'Success',
            // result: deleteAddOnItem,
            message: "AddOnItem Deleted"
        });
    }).catch(err => {
        console.log('AddOnItem DELETE ERROR :', err);
        return res.status(400).json({
            status: 'Failed',
            message: "AddOnItem Deleted Failed"
        });
    })
}



// Edit AddOnItem
exports.editAddOnItem=(req,res)=>{
    const ID = req.params.id
    addOnItemModel.findById({ _id: ID }).then(AddOnItemEditData => {
        // console.log(AddOnItemEditData);
        return res.status(200).json({
            status: 'Success',
            result: AddOnItemEditData,
            message: "AddOnItem edit Data"
        });
    }).catch(err => {

        console.log('AddOnItem edit Data Failed ERROR: ', err);
        return res.status(400).json({
            status: 'Failed',
            message: "AddOnItem edit Data Failed"
        });
    })
}


// update AddOnItem
exports.updateAddOnItem=(req,res)=>{
    const addOnItemUpdateId = req.body._id;
    const {addOnItemName } = req.body;

    const lowerCase = addOnItemName.toLowerCase();

    // console.log('req.body', addOnItemUpdateId);
    addOnItemModel.findById({ _id: addOnItemUpdateId }).then(result => {
        // console.log(result);
            result.addOnItemName = lowerCase,
            result.addOnItemPrice = req.body.addOnItemPrice, 


        result.save((err,data)=>{
            if(!err){
                console.log('update addOnItem Data');
                return res.status(200).json({
                    status: 'Success',
                    result: data,
                    message: "update addOnItem Data"
                });
            }else{
                console.log(`update addOnItem Data ERROR:${err}`);
                return res.status(400).json({
                    status: 'Failed',
                    message: "update addOnItem Data ERROR"
                });
            }
        })

    })
}