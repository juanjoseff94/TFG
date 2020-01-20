var express = require('express');
var router = express.Router();
var Candidatura = require('../models/candidatura');
var passport = require('passport');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/apuntarse', function(req, res, next) {
    addToDB(req, res);
});

router.post('/buscarCandidaturas', function(req, res, next) {
    let query = {};
    query.word = new RegExp(req.body.word, 'i');
    word.find(query, function(error, resp) {
        if (error) {
            return res.status(400).send({ msg: 'error' });
        }
        return res.status(200).send(resp);
    });
});

router.get('/candidaturas', async(req, res) => {
    try {
        const candidatura = await Candidatura.find();
        res.json(candidatura);
    } catch (e) {
        console.log(e);
    }
});

router.post('/aceptarCandidatura', function(req, res, next) {
    aceptarCand(req, res);
});

async function aceptarCand(req, res) {
    try {
        console.log(req.body.idOferta);
        console.log(req.body.estado);
        /*var candidatura = new Candidatura();
        doc = await candidatura.update({ idOferta: req.body.idOferta }, { $set: { estado: req.body.estado } });
        return res.status(201).json(doc);*/
        Candidatura.findOne({
                idOferta: req.body.idOferta
            })
            .then((candidatura) => {
                candidatura.estado = req.body.estado;
                candidatura
                    .save()
                    .then(() => {
                        res.jsonp({ candidatura }); // enviamos la boleta de vuelta
                    });
            });
    } catch (err) {
        return res.status(501).json(err);
    }


}

async function addToDB(req, res) {

    var candidatura = new Candidatura({
        idOferta: req.body.idOferta,
        idEmpresa: req.body.idEmpresa,
        idCandidato: req.body.idCandidato,
        nombreCandidato: req.body.nombreCandidato,
        idReferal: req.body.idReferal,
        descripcionOf: req.body.descripcionOf,
        descripcion: req.body.descripcion,
        empresa: req.body.empresa,
        puesto: req.body.puesto,
        puestoOf: req.body.puestoOf,
        skills: req.body.skills,
        experiencia: req.body.experiencia,
        telefono: req.body.telefono,
        email: req.body.email,
        salario: req.body.salario,
        referalValue: req.body.referalValue,
        fechaFin: req.body.fechaFin,
        estado: req.body.estado
    });

    try {
        doc = await candidatura.save();
        return res.status(201).json(doc);
    } catch (err) {
        return res.status(501).json(err);
    }
}
module.exports = router;