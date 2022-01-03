const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post('/login',[
    check('correo', 'El correo debe ser obligatorio').isEmail(),
    check('password','La contraseña debe ser obligatoria').notEmpty(),
    validarCampos
],login);

router.post("/google",[
    check("id_token", "El token es requerido").notEmpty(),
    validarCampos,
  ],
  googleSignIn
);

module.exports = router;