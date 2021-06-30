const {Schema, model} = require('mongoose');

const OfertaSchema = Schema({
    titulo:{ type: String, require:true},
    cuerpo:{ type: String, require:true},
    precio:{ type: Number, require:true},
    categoria:{ type: String, require:true},

    usuario:{require:true,  type: Schema.Types.ObjectId, ref: 'Usuario' },
    fechaCreacion: {type: Date, default: Date.now()}
    }, {
        timestamps: false,
        versionKey: false,
  });



module.exports =model('Oferta', OfertaSchema);