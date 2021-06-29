const {Router} = require('express');

const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

const {getUsuario, crearUsuario} = require('../controllers/usuario');

router.get('/' ,getUsuario);

router.post('/',[
    check('nombres', 'El nombre es obligatorio').not().isEmpty(),
    // check('password', 'El pass es obligatorio').not().isEmpty(),
    // check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
] ,crearUsuario);

module.exports = router;