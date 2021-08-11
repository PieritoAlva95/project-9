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
    const users = await Usuario.find({ esAdmin: false });
    res.json(users);
  } catch (error) {
    res.json({
<<<<<<< HEAD
      mensaje: 'Error del server',
=======
      mensaje: "Error del server"
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
    });
  }
};

const getUsuariosAdmin = async (req, res) => {
  try {
    const users = await Usuario.find({ _id: { $ne: req.params.id } });
    res.json(users);
  } catch (error) {
    res.json({
<<<<<<< HEAD
      mensaje: 'Error del server',
=======
      mensaje: "Error del server"
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
    });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const user = await Usuario.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.json({
<<<<<<< HEAD
      mensaje: 'Error',
    });
  }
};
=======
      mensaje: "Error"
    });
  }

}

>>>>>>> 68cf343c8151aad16293484c8501397cd569f635

const crearUsuario = async (req, res = response) => {
  const { email, password, numeroDeCelular, documentoDeIdentidad } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    const existeTelefono = await Usuario.findOne({ numeroDeCelular });
    const existeCedula = await Usuario.findOne({ documentoDeIdentidad });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo electrónico ya existe',
      });
    }

    if (existeTelefono) {
      return res.status(400).json({
        ok: false,
        msg: 'El número de telefono ya existe',
      });
    }

    if (existeCedula) {
      return res.status(400).json({
        ok: false,
        msg: 'El número de cédula ya existe',
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
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado, consulta con el administrador',
    });
  }
};

const actualizarUsuario = async (req, res) => {
  const uid = req.params.id;
  try {
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    const cambio = {
      ...req.body,
      usuario: uid,
    };
    const token = await generarJWT(usuario.id);
    const usuarioDB = await Usuario.findByIdAndUpdate(uid, cambio, {
      new: true,
    });

    res.json({
      ok: true,
      token,
      usuarioDB,
    });
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

const cambiarPassword = async (req, res) => {
  const uid = req.params.id;
  const usuario = await Usuario.findById(uid);
  const passAct = req.body.passwordActual;
<<<<<<< HEAD
  const validPassword = bcryptjs.compareSync(passAct, usuario.password);
=======
  const validPassword = bcryptjs.compareSync( passAct, usuario.password );
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
  try {
    if (validPassword) {
      if (!usuario) {
        return res.status(404).json({
          ok: false,
<<<<<<< HEAD
          msg: 'El usuario no existe',
=======
          msg: 'El usuario no existe'
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
        });
      }

      const salt = bcryptjs.genSaltSync();
      const pass = bcryptjs.hashSync(req.body.password, salt);
      usuario.password = pass;
      const usuarioDB = await Usuario.findByIdAndUpdate(uid, usuario);

      res.json({
        ok: true,
        usuarioDB,
<<<<<<< HEAD
        msg: 'Su contraseña se ha actualizado correctamente',
      });
    } else {
      res.json({
        ok: false,
        msg: 'La contraseña es actual es incorrecta',
      });
=======
        msg:"Su contraseña se ha actualizado correctamente"
      })
    }else{
      res.json({
        ok:false,
        msg:"La contraseña es actual es incorrecta"
      })
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado, consulta con el administrador',
    });
  }
<<<<<<< HEAD
};
=======

}
>>>>>>> 68cf343c8151aad16293484c8501397cd569f635

module.exports = {
  getUsuario,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  getUsuarioById,
  getUsuarios,
  getUsuariosAdmin,
  cambiarPassword,
};
