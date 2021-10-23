const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosPOST, usuariosGet, usuariosDelete, usuariosPatch, usuariosPut } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const {esValidarRol, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');
 
const router = Router();


     router.post("/",[
       check('nombre', 'El nombre es obligatorio').notEmpty(), 
       check('password','El minimo de caracteres en la contraseña debe ser de 6').isLength({min:6}),
       check('correo').custom(emailExiste),
      //  check('correo', 'El correo no es valido').isEmail(),
       check('rol').custom( esValidarRol),
    //    check('rol','No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
       validarCampos
    ], usuariosPOST);

    router.get("/",  usuariosGet);

    router.put(
      "/:id",[
         check('rol').custom(esValidarRol),
         check('id').custom(existeUsuarioPorId),
         validarCampos
      ],usuariosPut);

    router.delete(
      "/:id",[
         check("id").custom(existeUsuarioPorId),
         validarCampos
         ],usuariosDelete);

    router.patch("/", usuariosPatch);








module.exports = router;