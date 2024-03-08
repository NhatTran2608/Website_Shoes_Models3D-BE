const brandController = require('../app/controllers/Brand.controller')
const middlewareController = require('../app/controllers/Middleware.controller');
const express = require('express');
const router = express.Router();

router.post('/post/createBrand', middlewareController.verifyTokenAndAdminAuthPOST, brandController.createBrand)
router.get('/getAll/brand', brandController.getAllBrand)
router.get('/getOne/:id', brandController.getOneBrand)
module.exports = router;