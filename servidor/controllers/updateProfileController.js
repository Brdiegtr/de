const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { nombrecompleto, name, bio, email, password } = req.body;

    // Buscar al usuario
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    // Verificar si el nuevo correo ya lo tiene otro usuario
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ msg: 'Este correo ya está en uso por otro usuario' });
      }
      user.email = email;
    }

    // Actualizar otros campos
    if (nombrecompleto) user.nombrecompleto = nombrecompleto;
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;

    // Actualizar contraseña solo si se proporciona
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({
      msg: 'Perfil actualizado correctamente',
      user: {
        id: user._id,
        nombrecompleto: user.nombrecompleto,
        name: user.name,
        bio: user.bio,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Error al actualizar perfil:', err);
    res.status(500).json({ msg: 'Error en el servidor', error: err.message });
  }
};
