const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const imageRoutes = require('./routes/imageRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 👇 Agrega esta línea aquí
app.use('/uploads', express.static('uploads'));


app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/comments', commentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(process.env.PORT, () =>
      console.log(`Servidor en http://${process.env.IP}:${process.env.PORT}`)
    );
  })
  .catch(err => console.error('Error conectando a MongoDB', err));
