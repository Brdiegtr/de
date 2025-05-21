const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/:imageId', commentController.addComment);
router.get('/:imageId', commentController.getCommentsByImage);

module.exports = router;
