const {Router} = require('express');
const { usuariosPOST, usuariosGet, usuariosDelete, usuariosPatch, usuariosPut } = require('../controllers/usuarios');

const router = Router();


    router.post("/", usuariosPOST);

    router.get("/", usuariosGet);

    router.put("/:id", usuariosPut);

    router.delete("/", usuariosDelete);

    router.patch("/", usuariosPatch);








module.exports = router;