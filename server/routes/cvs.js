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

router.get('/getCvs', async(req, res) => {
    try {
        const cv = await Cv.find();
        res.json(cv);
    } catch (e) {
        console.log(e);
    }

});

async function addToDB(req, res) {

    var cv = new Cv({
        idUser: req.body.idUser,
        nombre: req.body.nombre,
        puestoActual: req.body.puestoActual,
        descripcion: req.body.descripcion,
        skills: req.body.skills,
        experiencia: req.body.experiencia
    });

    try {
        doc = await cv.save();
        return res.status(201).json(doc);
    } catch (err) {
        return res.status(501).json(err);
    }
}
module.exports = router;