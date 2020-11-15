const mogoose= require('mongoose');

const productSchema= new mogoose.Schema({
    product_name:{
        type:String,
        trim:true,
        required:[true,'Please Add Product']
    },
    product_category:{
        type:String,
        required:[true,'Please add valid Category']
    },
    brand:{
        type:String,
        required:[true,'Please add valid Brand']
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mogoose.model('product',productSchema)