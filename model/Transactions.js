const mogoose= require('mongoose');

const TransactionSchema= new mogoose.Schema({
    text:{
        type:String,
        trim:true,
        required:[true,'Please Add Some Text']
    },
    amount:{
        type:Number,
        required:[true,'Please add a positive or negtive number']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mogoose.model('Transaction',TransactionSchema)