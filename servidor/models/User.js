const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombrecompleto: {type: String, required: true},
  name: { type: String, required: true },
  bio: {type: String, default: 'Agrega una breve descripción sobre ti'},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
