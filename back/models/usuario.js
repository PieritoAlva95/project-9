const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombres:{ type: String, require:true},
    apellidos:{ type: String, require:true},
    documentoDeIdentidad:{type: String, require:true, unique:true},
    numeroDeCelular:{type: String, require:true, unique:true},
    email:{type: String, require:true, unique:true},
    password:{type: String, require:true},
    img:{type: String, default:'no-img.png'},
    skills:[{type:String, require:false, default:''}],
    bio:{type:String},
    redesSociales:[{
      twitter:{type:String, default:'no-data'},
      facebook:{type:String, default:'no-data'},
      linkedin:{type:String, default:'no-data'},
      instagram:{type:String, default:'no-data'},
    }],
    experiencia:[{
      titulo:{type:String},
      empresa:{type:String},
      fechaInicio:{type:String},
      fechaFin:{type:String},
      descripcion:{type:String}
    }],
    estudios:[{
      nombreInstitucion:{type:String},
      titulo:{type:String},
      fechaInicio:{type:String},
      fechaFin:{type:String},
      descripcion:{type:String}
    }],
    esAdmin: { type: Boolean,  default: false},
    fechaCreacion: {type: Date, default: Date.now()}
    }, {
        timestamps: false,
        versionKey: false,
  });


//para modificar el _id de la tabla cambia de _id a uid
UsuarioSchema.method('toJSON', function(){
  //esto extraigo y cuando haga un get no lo devuelvo
  const {__v, _id, password, ...object} = this.toObject();

  object.uid = _id;
  return object;
})

module.exports =model('Usuario', UsuarioSchema);