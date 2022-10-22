
const addItemModel = require('../Model/addItem_Model');


exports.inputItemCheck = (req, res, next) => {
    console.log('req.body',req.body);
    const { Image, itemName, itemCategory,itemType,itemPrice} = req.body;
    
    if (!itemName) {
        return res.status(400).json({
            status: 400,
            message: "Please Enter itemName"
        });
    }
    
    if (!itemType) {
        return res.status(400).json({
            status: 400,
            message: "Please Enter item Type"
        });
    }
    if (!itemPrice) {
        return res.status(400).json({
            status: 400,
            message: "Please Enter item Price"
        });
    }
    
    next();
}


