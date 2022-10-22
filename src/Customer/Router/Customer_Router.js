const express = require('express');
const CustomerController = require('../Controller/Customer_Controller');
const CustomerInputCheck = require('../Middileware/Customer_Middileware');
const Customer_Route = express.Router();

// GET METHODS
Customer_Route.post('/addCustomer_post',CustomerInputCheck.inputCustomerCheck,CustomerController.addCustomer_post);


// EXPORTS SECTION
module.exports = Customer_Route;