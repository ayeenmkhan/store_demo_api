const express= require('express');
const router= express.Router();
const { getTransactions, addransactions, deleteTransactions}= require('../controller/transactions');

router.route('/')
.get(getTransactions)
.post(addransactions);


router.route('/:id')
.delete(deleteTransactions);



module.exports=router;