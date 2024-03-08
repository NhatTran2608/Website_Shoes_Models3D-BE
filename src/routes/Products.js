
const express = require('express');
const Products = require('../app/controllers/Products.controller');
const middlewareController = require('../app/controllers/Middleware.controller');
const router = express.Router();

router.post('/post/addProduct', middlewareController.verifyTokenAndAdminAuthPOST, Products.createProduct)
router.get('/getOne/:id', Products.getOneProduct)
router.get('/getAll', Products.getAllProduct)
router.put('/put/editProduct/:id', middlewareController.verifyTokenAndAdminAuthPOST, Products.editProduct)
router.delete('/delete/:id', middlewareController.verifyTokenAndAdminAuthPOST, Products.deleteProduct)


module.exports = router;