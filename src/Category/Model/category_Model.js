const mongoose = require('mongoose');
const Schema = mongoose.Schema

const addCategorySchema =new Schema({
    categoryImage:{
        type:mongoose.Schema.Types.Array,
        required:true
    },
    categoryName:{
        type:String,
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

const addCategoryModel = mongoose.model('addCategory',addCategorySchema);

module.exports = addCategoryModel