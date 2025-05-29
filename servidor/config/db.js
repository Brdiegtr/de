const mongoose = require('mongoose');
require('dotenv').config();  // Asegúrate de que .env esté correctamente configurado

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
