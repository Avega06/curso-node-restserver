const { response, request } = require("express");
const res = require("express/lib/response");
const { Producto } = require('../models');
const { countDocuments } = require('../models/producto');

const obtenerProductos = async(req, res = response)=>{
        
        const {limite = 5, desde = 0} = req.query;
        const query = { estado: true };
        
        const [total, producto] = await Promise.all([
          Producto.countDocuments(query),  
          Producto.find(query)
              .populate('usuario','nombre')
              .populate('categoria','nombre')
              .skip(Number(desde))
              .limit(Number(limite))
        ]);

        res.json({
            total,
            producto
        });
}

const obtenerProducto = async(req, res = response)=>{

    const { id } = req.params;

    const producto  = await Producto.findById(id)
                            .populate('usuario','nombre')
                            .populate('categoria','nombre');

    res.json( producto );

}

const crearProducto = async(req, res = response)=>{

    const {usuario, estado, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre : body.nombre });

    if( productoDB ){
        res.status(400).json({
            msg: `El producto ${nombre} existe`
        });
    }

    const data ={
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario :  req.usuario._id   
    }
    
    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto);



}


const actualizarProducto = async(req, res = response)=>{

    const  { id } = req.params;

    const {estado, usuario, ...data} = req.body;

    if( data.nombre ){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new : true});

    res.json(producto);


}

const borrarProducto = async(req, res = response)=>{
    
      const {id} = req.params;

      // const producto = Producto.findByIdAndDelete(id);
      const producto = await Producto.findByIdAndUpdate(id,{estado:false});

       res.json( producto );

}

module.exports = {
    actualizarProducto,
    borrarProducto,
    crearProducto,
    obtenerProducto,
    obtenerProductos,
}