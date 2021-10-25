    const { response, request } = require("express");
    const Usuario = require("../models/usuario");
    const bcryptjs = require('bcryptjs');
    const { generarJWT } = require("../helpers/generarJWT");


        const login = async (req, res = response) =>{

            const { correo, password} = req.body;

            try {

                const usuario = await Usuario.findOne({correo});
                if(!usuario){
                    return res.status(400).json({
                        msg: 'Usuario / Password no son correctos - correo'
                    });
                }

                if (!usuario.estado) {
                    return res.status(400).json({
                        msg : 'Usuario / Password no son correctos - estado : false'
                    })
                }

                const validPassword = bcryptjs.compareSync(password, usuario.password);
                if(!validPassword){
                    return res.status(400).json({
                      msg: "Usuario / Password no son correctos - password incorrecta",
                    });
                }

                const token = await  generarJWT(usuario.id);







                res.json({
                    msg: 'Login ok',
                    usuario,
                    token
                });
                
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    msg : 'Algo salio mal, contacte al administrador'
                });
            }

        }

    module.exports = {
        login
    }
