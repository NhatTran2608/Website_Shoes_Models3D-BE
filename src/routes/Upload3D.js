// routes/v1/upload.js

const express = require('express');
const uploadController3D = require('../app/controllers/UploadModel3D.controller');
const middlewareController = require('../app/controllers/Middleware.controller');
const model3DController = require('../app/controllers/Model3D.controller');
const router = express.Router();

// Image upload route
router.post('/upload3D', uploadController3D.upload3D.array('files', 1), uploadController3D.uploadController3D);
router.put('/edit3D', uploadController3D.upload3D.array('files', 1), uploadController3D.uploadController3D);
router.delete('/delete3D/:id', uploadController3D.deleteFile3D)

//Upload DataBase
router.post('/post/Model3D', middlewareController.verifyTokenAndAdminAuthPOST, model3DController.create3D)

module.exports = router;

