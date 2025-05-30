const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const authController = require('../controllers/updateProfileController');
const deleteController = require('../controllers/deleteProfileController');

router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', authController.updateProfile);
router.delete('/delete/:id', deleteController.deleteProfile);  // Esta es la ruta para eliminar perfil

module.exports = router;
