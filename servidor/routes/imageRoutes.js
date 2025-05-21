// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configurar almacenamiento con carpeta por userId
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.params.userId || req.body.userId;
    if (!userId) {
      return cb(new Error("userId no especificado"), false);
    }

    const uploadPath = path.join(__dirname, '..', 'uploads', userId);

    // Crear carpeta si no existe
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({ storage });

// CORREGIDO: Asignar req.query.userId para multer
router.post('/:userId', (req, res, next) => {
  req.query.userId = req.params.userId; // 👈 importante para multer
  next();
}, upload.single('image'), imageController.uploadImage);


// Obtener imágenes de un usuario
router.get('/user-images/:userId', imageController.getUserImages);

// Obtener todas las imágenes
router.get('/all', imageController.getAllImages);

module.exports = router;
