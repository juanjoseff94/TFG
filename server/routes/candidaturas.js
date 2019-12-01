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


async function addToDB(req, res) {

    var candidatura = new Candidatura({
        idOferta: req.body.idOferta,
        idCandidato: req.body.idCandidato,
        nombreCandidato: req.body.nombreCandidato,
        idReferal: req.body.idReferal,
        empresa: req.body.empresa,
        puesto: req.body.puesto,
        salario: req.body.salario,
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