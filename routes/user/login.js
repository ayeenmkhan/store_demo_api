const express= require('express');
const router= express.Router();
const { userLogin }= require('../../controller/user/login');

router.route('/')
.post(userLogin);


module.exports=router;