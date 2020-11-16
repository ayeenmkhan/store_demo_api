const mogoose= require('mongoose');

const userRegisterSchema= new mogoose.Schema({
    full_name:{
        type:String,
        trim:true,
        required:[true,'Please Add Some Text']
    },
    // contact_number:{
    //     type:Number,
    //     required:[true,'Please add a number']
    // },
    email_id:{
        type:String,
        required:[true,'Please add valid email']
    },
    user_type:{
        type:String,
        default:0
    },
    username:{
        type:String,
        unique: true,
        index: {
            unique: true
        },
        required:[true,'Please add a unique username']
    },
    password:{
        type:String,
        required:[true,'Please add Password']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mogoose.model('users',userRegisterSchema)