
const addOnItemModel = require('../Model/addOnItem_Model');


exports.inputAddOnItemCheck = (req, res, next) => {
    const { addOnItemImage, addOnItemName,addOnItemPrice} = req.body;
    
    // console.log('middileware',req.body);



    if (!addOnItemName) {
        return res.status(400).json({
            status: 400,
            message: "Please Enter addOnItem Name"
        });
    }
    if (!addOnItemPrice) {
        return res.status(400).json({
            status: 400,
            message: "Please Enter addOnItem Price"
        });
    }
    
    next();
}


