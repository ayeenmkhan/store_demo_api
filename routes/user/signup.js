const express= require('express');
const router= express.Router();
const { registerUser }= require('../../controller/user/signup');

router.route('/')
.post(registerUser);



module.exports=router;