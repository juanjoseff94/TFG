var express = require('express');
var router = express.Router();
var Cv = require('../models/cv');
var passport = require('passport');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/cvs', function(req, res, next) {
    addToDB(req, res);
});

async function addToDB(req, res) {

    var oferta = new Cv({
        idUser: req.body.idUser,
        nombre: req.body.nombre,
        puestoActual: req.body.puestoActual,
        skills: req.body.skills,
        experiencia: req.body.experiencia
    });

    try {
        doc = await oferta.save();
        return res.status(201).json(doc);
    } catch (err) {
        return res.status(501).json(err);
    }
}
module.exports = router;