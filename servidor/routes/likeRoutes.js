const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.post('/toggle', likeController.toggleLike);
router.get('/count/:imageId', likeController.getLikesCount);
router.get('/liked/:imageId', likeController.userLikedImage);

module.exports = router;
