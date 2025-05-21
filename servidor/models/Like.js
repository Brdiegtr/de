const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

likeSchema.index({ imageId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);
