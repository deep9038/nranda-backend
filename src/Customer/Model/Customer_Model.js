const mongoose = require('mongoose');
const Schema = mongoose.Schema

const addCustomerSchema =new Schema({
    CustomerName:{
        type:String,
        required:true
    },
    CustomerNumber:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:1
    }
}) 

const addCustomerModel = mongoose.model('Customer',addCustomerSchema);

module.exports = addCustomerModel