const Image = require('../models/Image');
const User = require('../models/User');

// Subir imagen
exports.uploadImage = async (req, res) => {
  const descripcion = req.body.descripcion;
  const userId = req.body.userId || req.query.userId;

  if (!req.file || !userId) {
    return res.status(400).json({ msg: 'Faltan campos obligatorios: archivo o userId' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const imageUrl = `/uploads/${userId}/${req.file.filename}`;
    const newImage = new Image({ userId, imageUrl, descripcion });
    await newImage.save();

    res.status(201).json({ msg: 'Imagen registrada correctamente', image: newImage });
  } catch (error) {
    console.error('❌ Error al subir imagen:', error);
    res.status(500).json({ msg: 'Error en el servidor', error: error.message });
  }
};

// Obtener todas las imágenes
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find()
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ msg: 'Error en el servidor', error: error.message });
  }
};

// Obtener imágenes de un usuario
exports.getUserImages = async (req, res) => {
  const { userId } = req.params;
  try {
    const images = await Image.find({ userId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ msg: 'Error en el servidor', error: error.message });
  }
};
