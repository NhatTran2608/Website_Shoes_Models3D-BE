const express = require('express');
const middlewareController = require('../app/controllers/Middleware.controller');
const commentsController = require('../app/controllers/Comments.controller');
const router = express.Router();

router.post('/post/comment', middlewareController.verifyTokenPOST, commentsController.createComments)
router.get('/get/comments/:id', commentsController.getOneComment)
module.exports = router;