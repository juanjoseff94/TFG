var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    idUser: { type: String, require: true },
    nombre: { type: String, require: true },
    puestoActual: { type: String, require: true },
    descripcion: { type: String, require: false },
    skills: { type: String, require: true },
    experiencia: { type: String, require: true },
    telefono: { type: String, require: false },
    email: { type: String, require: false }
});

module.exports = mongoose.model('Cv', schema);