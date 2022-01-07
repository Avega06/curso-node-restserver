const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario, Categoria, Producto } = require("../models");

const { ObjectId } = require('mongoose').Types;



const colecionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'productosXcategoria'
]

const buscarCategoria = async ( termino = '' , res = response) => {
    
    const isMongoId =  ObjectId.isValid(termino);

    if (isMongoId) {
        const categoria = await Categoria.findById(termino);
        res.json({
            results : (categoria) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i'); 
    const categoria = await Categoria.find({
        $and : [{ nombre: regex }, {estado : true}]
    });

    res.json({
        results : categoria
    })

}

const buscarProductos = async ( termino = '' , res = response) => {
    
    const isMongoId =  ObjectId.isValid(termino);

    if (isMongoId) {
        const producto = await Producto.findById(termino)
                         .populate('categoria', 'nombre');
        res.json({
            results : (producto) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i'); 
    const producto = await Producto.find({ nombre : regex , estado : true})
                                           .populate('categoria', 'nombre');

    res.json({
        results : producto
    })
}

const buscarUsuarios = async ( termino = '' , res = response)=>{

    const isMongoId =  ObjectId.isValid(termino);

    if (isMongoId) {
        const usuario = await Usuario.findById(termino);
        res.json({
            results : (usuario) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i'); 
    const usuarios = await Usuario.find({
        $or : [{ nombre: regex } , { correo: regex }],
        $and : [{estado : true}]
        
    });

    res.json({
        results : usuarios
    });

}

const buscarProductosXcategoria = async( word = '', res = response) => {
 
    const isMongoID = ObjectId.isValid( word )
 
    if ( isMongoID ) {
        const producto = await Producto.find( { categoria: ObjectId( word ) } )
                                        .populate('categoria', 'nombre')
 
        return res.json( {
            results: ( producto ) ? [ producto ] : []
        })
    }
 
    const regex = new RegExp( word, 'i' )
 
    const categorias = await Categoria.find({ nombre: regex, estado: true})
    
    const products = await Producto.find({
        $or: [...categorias.map( categoria => ({
            categoria: categoria._id
        }))],
        $and: [{ estado: true }]
    }).populate('categoria', 'nombre')
 
 
    res.json({
        results: products
    })
 
}

const buscar = (req , res = response)=>{

    const { coleccion, termino } = req.params;

    if( !colecionesPermitidas.includes( coleccion )){
        return res.status(400).json({
            msg : `Las coleciones permitidas son ${ colecionesPermitidas }`
        });
    }

    switch (coleccion) {
        case  'usuarios':
            buscarUsuarios(termino, res);
        break;
        case  'categoria':
            buscarCategoria(termino, res);
        break;
        case  'productos':
            buscarProductos(termino, res);
        case  'productosXcategoria':
            buscarProductosXcategoria(termino, res);    
        break;

        default:
            res.status(500).json({
                msg : 'Se le olvido hacer esta busqueda'
            });


    }





    /*res.json({
        coleccion,
        termino
    })*/
}

module.exports = {
buscar,
}