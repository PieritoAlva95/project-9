const {response} = require('express');
const Usuario = require('../models/usuario');


const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsuario = async(req, res) =>{

    const desde = Number(req.query.desde) || 0;
    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombres apellidos documentoDeIdentidad  numeroDeCelular email ')
            .skip( desde )
            .limit(5),

        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });

}




const crearUsuario = async(req, res = response) =>{

    const {nombres, apellidos, documentoDeIdentidad, numeroDeCelular, email,
        password} = req.body;
    
    try {
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:true,
                msg: "correo existente"
            });
        }

        const usuario = new Usuario(req.body);
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt );

        //guardar usuario
        await usuario.save();

        //generar token
        console.log(usuario._id);
        const token = await generarJWT(usuario.id);
        res.json({
            ok:true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'error inesperado, consulta con el administrador'
        });
    }
}

module.exports = {
    getUsuario,
    crearUsuario,
    
    
}