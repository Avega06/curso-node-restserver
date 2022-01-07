const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        borrarCategoria, 
        actualizarCategoria} = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validators");

const { validarJWT, validarCampos, tieneRol, esAdminRole } = require("../middlewares");

const router = Router();

router.get("/", obtenerCategorias     
);

router.get('/:id',[
check('id').custom(existeCategoria),
validarCampos
], obtenerCategoria );

router.post("/",[ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos 
], crearCategoria);

router.put("/:id",[
validarJWT,
check('id').custom(existeCategoria),
validarCampos
],actualizarCategoria);

router.delete("/:id",[
    validarJWT,
    esAdminRole,
    check('id').custom(existeCategoria),
    validarCampos,
],borrarCategoria
);







module.exports = router;