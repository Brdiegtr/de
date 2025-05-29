// routes/commentRoutes.js
const express = require('express');
const commentController = require('../controllers/commentController');

module.exports = (io) => {
  const router = express.Router();

  router.post('/:imageId', commentController.addComment(io)); // 👈 pasamos io
  router.get('/:imageId', commentController.getCommentsByImage);

  return router;
};
