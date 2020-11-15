const express= require('express');
const router= express.Router();
const { getProduct, addProduct, deleteProduct, updateProduct }= require('../../controller/product/product');

router.route('/')
.get(getProduct)
.post(addProduct)
.put(updateProduct);

router.route('/:id')
.delete(deleteProduct);



module.exports=router;