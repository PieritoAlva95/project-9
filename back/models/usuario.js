const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombres:{ type: String, require:true},
    apellidos:{ type: String, require:true},
    documentoDeIdentidad:{type: String, require:true, unique:true},
    numeroDeCelular:{type: String, require:true, unique:true},
    email:{type: String, require:true, unique:true},
    password:{type: String, require:true},
    esAdmin: { type: Boolean,  default: false},
    fechaCreacion: {type: Date, default: Date.now()}
    }, {
        timestamps: false,
        versionKey: false,
  });



module.exports =model('Usuario', UsuarioSchema);