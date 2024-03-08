
const express = require('express');
const middlewareController = require('../app/controllers/Middleware.controller');
const Order = require('../app/controllers/Order.controller');
const router = express.Router();

router.get('/getOne/item', middlewareController.verifyTokenGET, Order.getOneItem)
router.get('/getAll/list_order', middlewareController.verifyTokenAndAdminAuthGET, Order.getAllOder)
router.put('/put/order', middlewareController.verifyTokenAndAdminAuthPOST, Order.updateOrder)
module.exports = router;