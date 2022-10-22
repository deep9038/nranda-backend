const mongoose = require('mongoose');
const Schema = mongoose.Schema

const addToCardSchema = new Schema({
   customerName:{
    type:String,
   },
   customerNumber:{
    type:String,
   } ,
   orderItems:{
      type:mongoose.Schema.Types.Array,
      required:true
   },
   // orderAddOnItems:{
   //  type:mongoose.Schema.Types.Array,
   // },
   totalPrice:{
    type:Number,
   //  required:true
   },
   status:{
    type:Boolean,
    default:1
   }
})

const addToCardModel = mongoose.model('addToCard',addToCardSchema); 


// EXPORTS SECTION
module.exports = addToCardModel