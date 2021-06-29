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

const actualizarUsuario = async(req, res) =>{
    
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg: 'El usuario no existe'
            });
        }
    
         //actualizacion
         //digo que estos campos no son necesarios para actualizar
         const {passwrord, documentoDeIdentidad, email, ...campos} = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail) {
                return res.status(400).json({
                    ok:false,
                    msg:'El correo ya existe'
                })
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok:true,
            usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error revisar los logs'
        })

    }
}

const borrarUsuario = async(req, res) =>{

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg: 'El usuario no existe'
            });
        }

        await Usuario.findByIdAndDelete(uid);
        res.json(
            {
                ok:true,
                msg: 'Usuario Eliminado'
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'error revise los logs'
        })
    }
}

module.exports = {
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
    
}