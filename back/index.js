require('dotenv').config(); //leo las variables de entorno
const path = require('path');
const express = require('express');
const cors = require('cors');
require('./db/config');

//servidor expresss
const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/login'));
app.use('/api/resetear-password', require('./routes/resetearPassword'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/oferta', require('./routes/ofertas'));
app.use('/uploads', express.static(path.resolve('./uploads/usuarios')));
app.use('/api/postulante', require('./routes/interesado'));

app.listen(process.env.PORT, () => {
  console.log('servidor corriendo correctamente');
});
