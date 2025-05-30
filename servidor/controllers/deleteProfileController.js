const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Image = require('../models/Image');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const jwt = require('jsonwebtoken');

exports.deleteProfile = async (req, res) => {
  const userIdFromParams = req.params.id;
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Token no proporcionado o inválido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id !== userIdFromParams) {
      return res.status(403).json({ msg: 'No autorizado para eliminar este perfil' });
    }

    // Elimina imágenes, comentarios, likes
    await Promise.all([
      Image.deleteMany({ userId: userIdFromParams }),
      Comment.deleteMany({ userId: userIdFromParams }),
      Like.deleteMany({ userId: userIdFromParams })
    ]);

    // Elimina la carpeta de imágenes del usuario
    const userFolderPath = path.join(__dirname, '..', 'uploads', userIdFromParams);

    fs.rm(userFolderPath, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error('❌ Error al eliminar la carpeta del usuario:', err.message);
        // No lanzamos error porque no es crítico
      } else {
        console.log('✅ Carpeta del usuario eliminada:', userFolderPath);
      }
    });

    // Elimina el usuario
    await User.findByIdAndDelete(userIdFromParams);

    res.json({ msg: 'Perfil y archivos eliminados correctamente' });
  } catch (err) {
    console.error('❌ Error al eliminar perfil:', err);
    res.status(500).json({ msg: 'Error en el servidor', error: err.message });
  }
};
