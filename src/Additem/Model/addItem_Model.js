const mongoose = require('mongoose');
const Schema = mongoose.Schema

const addItemSchema =new Schema({
    Image:{
        type:mongoose.Schema.Types.Array,
        required:true
    },
    itemName:{
        type:String,
        required:true
    },
    // itemCategory:{
    //     type:String,
    // },
    itemCategory:{
        type:Schema.Types.ObjectId,
        ref:'addCategory',
    },
    itemAddOn:[],
    itemType:{
        type:String,
        required:true
    },
    itemPrice:{
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

const addItemModel = mongoose.model('addItem',addItemSchema);

module.exports = addItemModel