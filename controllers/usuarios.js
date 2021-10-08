    const {response, request} = require('express');


    const usuariosGet = (req = request , res = response) => {
          
        const {q,nombre = 'No name',apikey} = req.query;


        res.json({
            msg: "get api",
            q,
            nombre,
            apikey
          });
    };
    const usuariosPOST =(req, res = response) => {
        const {nombre , edad} = req.body;

        res.json({
            msg : 'post api',
            nombre,
            edad
        });
    };
    const usuariosDelete = (req, res = response) => {
       res.json({
            msg: "delete api",
          });
    };
    const usuariosPatch = (req, res = response) => {
      res.json({
        msg: "patch api",
      });
    };
    const usuariosPut = (req, res = response) => {
      const {id} = req.params;
      res.json({
        msg: "put api",
        id
      });
    };

    module.exports = {
        usuariosGet,
        usuariosPOST,
        usuariosPatch,
        usuariosDelete,
        usuariosPut
    }

