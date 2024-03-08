// routes/v1/upload.js

const express = require('express');
const uploadController = require('../../src/app/controllers/UploadImage.controller');
const router = express.Router();

// Image upload route
router.post('/upload', uploadController.upload.array('files', 20), uploadController.uploadController);
router.put('/editImg', uploadController.upload.array('files', 20), uploadController.uploadController);
router.delete('/deleteImage/:id', uploadController.deleteImage)

module.exports = router;
