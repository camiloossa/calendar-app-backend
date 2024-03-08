/*
    Evento Routes
    /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();

// Todas las rutas tiene que pasar por la validacion del JWT
router.use( validarJWT );

// Consutlar Eventos
router.get('/', getEventos);


// Crear evento
router.post('/', [
        check('title', 'El titulo es obligatorio').not().isEmpty().escape(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ).escape(),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ).escape(),
        validarCampos,
    ], 
    crearEvento);

router.put('/:id', [
        check('title', 'El titulo es obligatorio').not().isEmpty().escape(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ).escape(),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ).escape(),
        validarCampos,
    ], 
    actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;