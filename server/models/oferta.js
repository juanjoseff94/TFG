var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    idUser: { type: String, require: true },
    empresa: { type: String, require: true },
    puesto: { type: String, require: true },
    salario: { type: String, require: true },
    fechaFin: { type: Date, require: true }
});

module.exports = mongoose.model('Oferta', schema);