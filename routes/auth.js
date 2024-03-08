/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', 
    [ 
        check('name', 'El nombre es obligatorio').not().isEmpty().escape(), 
        check('email', 'El correo ingresado no tiene formato Email').isEmail().escape(), 
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6}).escape(), 
        validarCampos
    ], 
    crearUsuario
);

router.post('/',
    [
        check('email', 'El correo ingresado no es valido').isEmail(), 
        check('password', 'El password debe de tener más de 6 caracteres').isLength({ min: 6}),
        validarCampos
    ]
    ,loginUsuario );

router.get('/renew', validarJWT ,revalidarToken);


module.exports = router;