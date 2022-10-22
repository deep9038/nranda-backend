// const addCustomerModel = require('../Model/Customer_Model');


exports.inputCustomerCheck = (req, res, next) => {
    const { CustomerName, CustomerNumber} = req.body;
    
    if (!CustomerName) {
        return res.status(400).json({
            status: 400,
            message: "Please Enter Customer Name"
        });
    }

    if (!CustomerNumber) {
        return res.status(400).json({
            status: 400,
            message: "Please Enter Customer Number"
        });
    }
    
    next();
}


