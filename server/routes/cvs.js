var express = require('express');
var router = express.Router();
var Cv = require('../models/cv');
var passport = require('passport');

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

router.post('/findCv', async(req, res) => {
    try {
        Cv.findOne({
                idUser: req.body.idUser
            })
            .then((cv) => {
                res.jsonp({ cv }); // devolvemos el objeto usuario mediante Node
            });
        // res.json(cv);
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
        experiencia: req.body.experiencia,
        telefono: req.body.telContacto,
        email: req.body.email
    });

    /*Cv.findOneAndDelete({
        email: req.body.email
    });*/
    Cv.findOneAndRemove({ email: req.body.email }, (err, result) => {
        if (err) return res.send(500, err);
    });

    try {
        doc = await cv.save();
        return res.status(201).json(doc);
    } catch (err) {
        return res.status(501).json(err);
    }
}
module.exports = router;