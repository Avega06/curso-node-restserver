const {Router} = require('express');
const { check } = require('express-validator');

const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        borrarProducto, 
        actualizarProducto} = require("../controllers/productos");

const { existeProductoPorId, existeCategoria } = require("../helpers/db-validators");

const router = Router();

const { validarJWT, validarCampos, tieneRol, esAdminRole } = require("../middlewares");

router.get("/", obtenerProductos     
);

router.get('/:id',[
check('id').custom(existeProductoPorId),
validarCampos
], obtenerProducto );

router.post("/",[ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria').custom( existeCategoria ),
    validarCampos 
], crearProducto);

router.put("/:id",[
validarJWT,
check('id').custom(existeProductoPorId),
validarCampos
],actualizarProducto);

router.delete("/:id",[
    validarJWT,
    esAdminRole,
    check('id').custom(existeProductoPorId),
    validarCampos,
],borrarProducto);


module.exports = router;