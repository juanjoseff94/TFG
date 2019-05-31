var express = require('express');
var router = express.Router();
var Oferta = require('../models/oferta');
var passport = require('passport');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/ofertar', function(req, res, next) {
    addToDB(req, res);
});

router.get('/ofertas', async(req, res) => {
    try {
        const oferta = await Oferta.find();
        res.json(oferta);
    } catch (e) {
        console.log(e);
    }

});


async function addToDB(req, res) {

    var oferta = new Oferta({
        idUser: req.body.idUser,
        empresa: req.body.empresa,
        puesto: req.body.puesto,
        salario: req.body.salario
    });

    try {
        doc = await oferta.save();
        return res.status(201).json(doc);
    } catch (err) {
        return res.status(501).json(err);
    }
}
module.exports = router;