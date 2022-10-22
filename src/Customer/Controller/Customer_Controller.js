const CustomerModel = require('../Model/Customer_Model');


// addCustomer_post
exports.addCustomer_post = (req, res) => {

    const { CustomerName, CustomerNumber } = req.body;
    CustomerModel.findOne({ CustomerNumber }, (error, findCustomerData) => {
        if (!findCustomerData) {
            new CustomerModel({
                CustomerName: req.body.CustomerName,
                CustomerNumber: req.body.CustomerNumber,

            }).save().then(addCustomer => {
                // console.log('addCustomer',addCustomer);
                return res.status(200).json({
                    status: 'success',
                    result: addCustomer,
                    message: "Customer Data Submitted"
                });
            }).catch(err => {
                // console.log('addCustomer ERROR : ', err);
                return res.status(400).json({
                    status: 'failed',
                    message: "Customer Data can't Submitted"
                });
            })

        } else {
            // console.log('Customer Data Allready Exsist',findCustomerData);
            return res.status(400).json({
                status: 'failed',
                message: "Customer Data Allready Exsist"
            });
        }
    })
}