const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app); // 🔁 usamos el server para socket.io

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rutas
const imageRoutes = require('./routes/imageRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes'); // ahora es una función
const likeRoutes = require('./routes/likeRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/comments', commentRoutes(io)); // 👈 pasamos io aquí
app.use('/api/likes', likeRoutes);

// Conexión a MongoDB y levantar el servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    server.listen(process.env.PORT, () =>
      console.log(`Servidor en http://${process.env.IP}:${process.env.PORT}`)
    );
  })
  .catch(err => console.error('Error conectando a MongoDB', err));

// Conexión de sockets
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});
