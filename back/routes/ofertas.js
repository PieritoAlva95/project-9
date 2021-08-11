const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { crearOferta,
    verOfertaUnica,
    verOfertas,
    actualizarOferta,
    borrarOferta,
    verOfertasByUser,
    getOfertasDiferentesUser,
    verOfertasContratadasByUser,
    getBuscarOfertas,
    getOfertasByCategoria
} = require('../controllers/oferta');

const router = Router();

router.get('/', verOfertas);

router.get('/:id', verOfertaUnica);

router.get('/usuario/:id', verOfertasByUser);

router.get('/usuario/contratos/:id', verOfertasContratadasByUser);
router.get('/busqueda/:text', getBuscarOfertas);
router.get('/busqueda/categoria/:text', getOfertasByCategoria);

router.post('/',
    [
        validarJWT,
        check('titulo', 'El titulo de la oferta es necesario').not().isEmpty(),
        check('cuerpo', 'El cuerpo de la oferta es necesario').not().isEmpty(),

        validarCampos
    ], crearOferta);



//router.get('/' ,getOfertaUsuario);

router.put('/:id',
    [
        validarJWT,
        check('titulo', 'El titulo de la oferta es necesario').not().isEmpty(),
        check('cuerpo', 'El cuerpo de la oferta es necesario').not().isEmpty(),

        validarCampos
    ], actualizarOferta);


router.delete('/:id', validarJWT, borrarOferta);

router.get('/usuario/get-ofertas/:id', getOfertasDiferentesUser)

module.exports = router;
