'use strict'
const carreraModel = require('./carrera.model');

module.exports.registrar = function(req, res) {
    let nuevaCarrera = new carreraModel({
        codigo : req.body.codigo,
        nombre : req.body.nombre,
        creditos : req.body.creditos,
        fechaCreacion : req.body.fechaCreacion,
        estado : req.body.estado
    });

    nuevaCarrera.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar la carrera' + error});
        }else{
            res.json({success : true, msg : 'La carrera se registró con éxito'});
        }
    });
};

module.exports.listar_todos = function(req, res){
    carreraModel.find().sort({nombre : 'asc'}).then(
        function(carreras){
            res.send(carreras);
        }
    );
};

module.exports.buscar_carrera = function(req, res){
    let sCodigo = req.body.codigo;
    let sNombre = req.body.nombre;
    carreraModel.find({ "codigo": { "$regex": sCodigo, "$options": "i" } }).then(
        function(carreras){
            res.send(carreras); 
        }
    );
};