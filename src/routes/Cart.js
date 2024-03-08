const express = require('express');
const Cart = require('../app/controllers/Cart.controller');
const middlewareController = require('../app/controllers/Middleware.controller');
const router = express.Router();

router.get('/getOne/:id', middlewareController.verifyTokenGET, Cart.getCart)
router.put('/put/:id', middlewareController.verifyTokenPOST, Cart.addCart)
router.put('/putQuantity/:id', middlewareController.verifyTokenPOST, Cart.updateCart)
router.post('/post/pay_product', middlewareController.verifyTokenPOST, Cart.createPayment)

module.exports = router;