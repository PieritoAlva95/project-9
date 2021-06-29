const mongoose = require('mongoose');
require('dotenv').config();  //leo las variables de entorno


mongoose.connect(process.env.DB_CNN, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
    .then(db => console.log('base de datos conectado'))
    .catch(err => console.log(err));