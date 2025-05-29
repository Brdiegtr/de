const Like = require('../models/Like');
const jwt = require('jsonwebtoken');

// 🔄 Dar o quitar like
exports.toggleLike = async (req, res) => {
  const { imageId } = req.body;
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ msg: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const existingLike = await Like.findOne({ imageId, userId });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      return res.status(200).json({ liked: false, msg: 'Like eliminado' });
    }

    await Like.create({ imageId, userId });
    res.status(201).json({ liked: true, msg: 'Like agregado' });
  } catch (error) {
    console.error('Error al manejar like:', error.message);
    res.status(500).json({ msg: 'Error al manejar el like', error: error.message });
  }
};

// ✅ Contar likes de una imagen
exports.getLikesCount = async (req, res) => {
  const { imageId } = req.params;

  try {
    const count = await Like.countDocuments({ imageId });
    res.json({ likes: count });
  } catch (error) {
    res.status(500).json({ msg: 'Error al contar los likes', error: error.message });
  }
};

// ✅ Ver si el usuario dio like
exports.userLikedImage = async (req, res) => {
  const { imageId } = req.params;
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ msg: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const existingLike = await Like.findOne({ imageId, userId });
    res.json({ liked: !!existingLike });
  } catch (error) {
    res.status(500).json({ msg: 'Error al verificar el like', error: error.message });
  }
};

exports.getLikesByUser = async (req, res) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ msg: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const likes = await Like.find({ userId }).populate('imageId');
    res.json(likes);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener los likes', error: error.message });
  }
}
