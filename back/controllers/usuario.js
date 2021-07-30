const { response } = require('express');
const Usuario = require('../models/usuario');

const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuario = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  const [usuarios, total] = await Promise.all([
    Usuario.find(
      {},
      'nombres apellidos documentoDeIdentidad  numeroDeCelular email '
    )
      .skip(desde)
      .limit(5),

    Usuario.countDocuments(),
  ]);

  res.json({
    ok: true,
    usuarios,
    total,
  });
};

const getUsuarios = async (req, res) => {
  try {
    const users = await Usuario.find({esAdmin:false});
    res.json(users);
  } catch (error) {
    res.json({
      mensaje:"Error del server"
    });
  }
}

const getUsuarioById = async (req, res) => {
  try {
    const user = await Usuario.findById(req.params.id);
    res.json(user);  
  } catch (error) {
    res.json({
      mensaje:"Error"
    });
  }
  
}


const crearUsuario = async (req, res = response) => {

  const { email,
    password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: true,
        msg: "correo existente"
      });
    }

    const usuario = new Usuario(req.body);
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar usuario
    await usuario.save();

    //generar token
    const token = await generarJWT(usuario.id);
    res.json({
      ok: true,
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado, consulta con el administrador'
    });
  }
}

const actualizarUsuario = async (req, res) => {

  const uid = req.params.id;
  try {
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe'
      });
    }

    const cambio = {
      ...req.body,
      usuario: uid
    }
    const token = await generarJWT(usuario.id);
    const usuarioDB = await Usuario.findByIdAndUpdate(uid, cambio, { new: true });

    res.json({
      ok: true,
      token,
      usuarioDB,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado, consulta con el administrador',
    });
  }
};

const borrarUsuario = async (req, res) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    await Usuario.findByIdAndDelete(uid);
    res.json({
      ok: true,
      msg: 'Usuario Eliminado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error revise los logs',
    });
  }
};

module.exports = {
  getUsuario,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  getUsuarioById,
  getUsuarios
};
