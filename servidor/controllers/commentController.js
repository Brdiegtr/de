const jwt = require('jsonwebtoken');
const Comment = require('../models/Comment');

// Agregar un comentario
// controllers/commentController.js

exports.addComment = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: 'Token no proporcionado' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const { imageId } = req.params;
    const { text } = req.body;

    if (!text) return res.status(400).json({ msg: 'El comentario está vacío' });

    const newComment = new Comment({
      imageId,
      userId,
      text,
      createdAt: new Date(),
    });

    await newComment.save();

    // 👇 Aquí se hace populate para devolver el user
    const populatedComment = await Comment.findById(newComment._id).populate('userId', 'name');

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error('Error en addComment:', error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token inválido o expirado' });
    }
    res.status(500).json({ msg: 'Error en el servidor', error: error.message });
  }
};


// Obtener todos los comentarios de una imagen
exports.getCommentsByImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    // Trae todos los comentarios del imageId y opcionalmente info básica del usuario que comentó
    const comments = await Comment.find({ imageId }).populate('userId', 'name');

    res.json(comments);
  } catch (error) {
    console.error('Error en getCommentsByImage:', error);
    res.status(500).json({ msg: 'Error en el servidor', error: error.message });
  }
};
