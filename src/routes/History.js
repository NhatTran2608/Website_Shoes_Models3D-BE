const express = require('express');
const historyController = require('../app/controllers/History.controller');
const middlewareController = require('../app/controllers/Middleware.controller');

const router = express.Router();
router.post('/post/history', middlewareController.verifyTokenPOST, historyController.CreateHistory)
router.get('/get/allHistory', middlewareController.verifyTokenAndAdminAuthGET, historyController.getAllHistory)
router.get('/getOne/history', middlewareController.verifyTokenGET, historyController.getOneHistory)
module.exports = router;