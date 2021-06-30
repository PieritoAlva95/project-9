require('dotenv').config();  //leo las variables de entorno
const express = require('express');
const cors = require('cors');

//servidor expresss
const app = express();
require('./db/config');



app.use(express.json());


app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/login'));
app.use( '/api/upload', require('./routes/uploads') );


app.use(cors());



app.listen(process.env.PORT, () => {
    console.log('servidor corriendo correctamente')
} )
