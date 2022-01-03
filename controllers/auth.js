    const { response, request, json } = require("express");
    const Usuario = require("../models/usuario");
    const bcryptjs = require('bcryptjs');
    const { generarJWT } = require("../helpers/generarJWT");
    const { googleVerify } = require("../helpers/google-verify");
const { DefaultTransporter } = require("google-auth-library");


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

        const googleSignIn = async (req, res = response) => {

            const {id_token} = req.body;
            
            try {

                const {correo,nombre,img} = await googleVerify( id_token )

                let usuario = await Usuario.findOne({correo});

                if(!usuario){
                    const data ={
                        nombre,
                        correo,
                        password: ':P',
                        rol: 'USER_ROLE',
                        img,
                        google: true
                    };


                    usuario = new Usuario( data );
                    await usuario.save();
                }

                if(!usuario.estado){
                    return res.status(401).json({
                        msg: 'Hable con el administrador, Usuario bloqueado'
                    });
                }
               
                const token = await generarJWT(usuario.id);

                res.json({
                usuario,
                token,
                });
                
            } catch (error) {
                res.status(400).json({
                    ok: false,
                    msg: 'El token no se pudo verificar'
                })
            }

        }

    module.exports = {
        login,
        googleSignIn
    }
