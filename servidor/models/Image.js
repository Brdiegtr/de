const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  descripcion: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);
