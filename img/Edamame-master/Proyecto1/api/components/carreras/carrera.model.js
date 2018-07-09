'use strict';
let mongoose = require('mongoose');

let carreraSchema = new mongoose.Schema({
    codigo : {type : String, required : true},
    nombre : {type : String, required : true},
    creditos : {type : Number, required : true},
    fechaCreacion : {type : Date, required : true},
    estado : {type : Boolean, required : true}
    //periodos
    //sedes
});
carreraSchema.index({codigo: 'text', nombre : 'text'});

module.exports = mongoose.model('Carrera', carreraSchema);