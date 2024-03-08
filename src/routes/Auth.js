const AuthController = require('../app/controllers/Auth.controller');
const middlewareController = require('../app/controllers/Middleware.controller');
const express = require('express');
const router = express.Router();

router.post('/SignUp', AuthController.signUp)
router.post('/SignIn', AuthController.signIn)
router.get('/getUser', middlewareController.verifyTokenGET, AuthController.getOneUser)
router.get('/getAllUser', middlewareController.verifyTokenAndAdminAuthGET, AuthController.getAllUser)
router.get('/getUserOfAdmin', middlewareController.verifyTokenAndAdminAuthGET, AuthController.getOneUserOfAdmin)
module.exports = router;