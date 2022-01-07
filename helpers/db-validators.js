const { Categoria, Usuario, Producto } = require("../models");
const roles = require("../models/roles");

const esValidarRol = async (rol = '') => {
    
      const existeRol = await roles.findOne({ rol });
        if (!existeRol) {
          throw new Error(`El rol ${rol} no esta registrado en la bd`);
      }
};

const emailExiste = async (correo = '') =>{
        
      const existeEmail = await Usuario.findOne({ correo });
        if (existeEmail) {
           throw new Error(`El email ${correo} ya existe`);
          }
        };
const existeUsuarioPorId = async (id) => {
   if (id.match(/^[0-9a-fA-F]{24}$/)) {
     const existeUsuario = await Usuario.findById(id).exec();
     if (!existeUsuario) {
       throw new Error(`El id ${id} no existe`);
     }
   } else {
     throw new Error(`${id} no es un ID válido`);
   }
};

const existeCategoria = async (id) => {
   if (id.match(/^[0-9a-fA-F]{24}$/)) {
     const existeCategoria = await Categoria.findById(id).exec();
     if (!existeCategoria) {
       throw new Error(`El id ${id} no existe`);
     }
   } else {
     throw new Error(`${id} no es un ID válido`);
   }
};

const existeProductoPorId = async (id) => {
   if (id.match(/^[0-9a-fA-F]{24}$/)) {
     const existeProducto = await Producto.findById(id).exec();
     if (!existeProducto) {
       throw new Error(`El id ${id} no existe`);
     }
   } else {
     throw new Error(`${id} no es un ID válido`);
   }
};




module.exports = {
    esValidarRol,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProductoPorId
}
