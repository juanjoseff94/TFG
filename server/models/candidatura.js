var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    idOferta: { type: String, require: true },
    idEmpresa: { type: String, require: true },
    idCandidato: { type: String, require: true },
    nombreCandidato: { type: String, require: true },
    idReferal: { type: String, require: false },
    empresa: { type: String, require: false },
    puesto: { type: String, require: false },
    salario: { type: String, require: false },
    referalValue: { type: Number, require: false },
    fechaFin: { type: String, require: false },
    estado: { type: String, require: false }
});

module.exports = mongoose.model('Candidatura', schema);