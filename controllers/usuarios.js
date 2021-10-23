    const {response, request} = require('express');
    const Usuario = require('../models/usuario');
    const bcryptjs = require('bcryptjs');
const { countDocuments } = require('../models/usuario');


    const usuariosGet = async (req = request , res = response) => {
          
        const {limite = 5, desde = 0} = req.query;
        const query = { estado: true };
        
        const [total, usuarios] = await Promise.all([
          Usuario.countDocuments(query), 
          Usuario.find(query)
              .skip(Number(desde))
              .limit(Number(limite))
        ]);
        res.json({
          total,
          usuarios
        });
    };

    const usuariosPOST = async (req, res = response) => {

       
        const {nombre, password, rol, correo} = req.body;
        const usuario = new Usuario({ nombre, password, rol, correo });


        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);



        
        await usuario.save();

        res.json({
            
            usuario
        });
    };
    const usuariosDelete = async(req, res = response) => {
       
      const {id} = req.params;
      
      // const usuario = Usuario.findByIdAndDelete(id);
      const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

       res.json({
            usuario       
          });
    };
    const usuariosPatch = (req, res = response) => {
      res.json({
        msg: "patch api",
      });
    };
    const usuariosPut = async(req, res = response) => {
      const {id} = req.params;
      const { _id,google, password, correo, ...resto } = req.body;
      if (password) {
         const salt = bcryptjs.genSaltSync();
         resto.password = bcryptjs.hashSync(password, salt);
      }

      const usuario = await Usuario.findOneAndUpdate(id,resto);

      
      res.json(usuario);
    };

    module.exports = {
        usuariosGet,
        usuariosPOST,
        usuariosPatch,
        usuariosDelete,
        usuariosPut
    }

