const mongoose = require('mongoose');
const Schema = mongoose.Schema

const addOnItemSchema =new Schema({
    // addOnItemImage:{
    //     type:mongoose.Schema.Types.Array,
    //     // required:true
    // },
    addOnItemName:{
        type:String,
        required:true
    },
    addOnItemPrice:{
        type:Number,
        required:true
    },
    Active:{
        type:Boolean,
        default:true
    },
    status:{
        type:String,
        default:1
    }
}) 

const addOnItemModel = mongoose.model('addOnItem',addOnItemSchema);

module.exports = addOnItemModel