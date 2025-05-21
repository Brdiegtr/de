const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authController = require('../controllers/updateProfileController');

router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', authController.updateProfile);

module.exports = router;
