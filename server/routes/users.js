var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', function(req, res, next) {
    addToDB(req, res);
});


async function addToDB(req, res) {

    var user = new User({
        email: req.body.email,
        role: req.body.role,
        referalValue: req.body.referalValue,
        referalsAceptados: req.body.referalValue,
        referalCount: req.body.referalValue,
        password: User.hashPassword(req.body.password),
        creation_dt: Date.now()
    });

    User.countDocuments({ email: req.body.email }, function(err, count) {
        if (count > 0) {
            console.log("Duplicado");
            return;
        } else {
            try {
                doc = user.save();
                return res.status(201).json(doc);
            } catch (err) {
                return res.status(501).json(err);
            }
        }
    });

}

router.post('/valorarReferal', function(req, res, next) {
    valorarRef(req, res);
});

router.post('/contadorReferal', function(req, res, next) {
    contadorRef(req, res);
});

async function valorarRef(req, res) {
    try {
        console.log('test');
        console.log(req.body.referalValue);
        console.log(req.body.email);
        // console.log(req.body.email);
        User.findOne({
                email: req.body.email
            })
            .then((user) => {
                console.log(user);
                user.referalsAceptados = user.referalsAceptados + 1;
                user.referalValue = (user.referalsAceptados / user.referalCount) * 105;
                user.referalValue = (Math.round(user.referalValue * 100) / 100).toFixed(2);
                if (user.referalValue > 100) {
                    user.referalValue = 100;
                }
                console.log(user.referalValue);
                user
                    .save()
                    .then(() => {
                        res.jsonp({ user }); // devolvemos el objeto usuario mediante Node
                    });
            });
    } catch (err) {
        return res.status(501).json(err);
    }


}

async function contadorRef(req, res) {
    try {
        console.log('test');
        console.log(req.body.referalCount);
        console.log(req.body.email);
        // console.log(req.body.email);
        User.findOne({
                email: req.body.email
            })
            .then((user) => {
                user.referalCount = user.referalCount + 1;
                user.referalValue = (user.referalsAceptados / user.referalCount) * 105;
                user.referalValue = (Math.round(user.referalValue * 100) / 100).toFixed(2);
                if (user.referalValue > 100) {
                    user.referalValue = 100;
                }
                console.log(user.referalValue);
                user
                    .save()
                    .then(() => {
                        res.jsonp({ user }); // devolvemos el objeto usuario mediante Node
                    });
            });
    } catch (err) {
        return res.status(501).json(err);
    }


}

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function(err) {
            if (err) { return res.status(501).json(err); }
            return res.status(200).json({ message: 'Login Success' });
        });
    })(req, res, next);
});

router.get('/user', isValidUser, function(req, res, next) {
    return res.status(200).json(req.user);
});

router.get('/logout', isValidUser, function(req, res, next) {
    req.logout();
    return res.status(200).json({ message: 'Logout Success' });
})

function isValidUser(req, res, next) {
    if (req.isAuthenticated()) next();
    else return res.status(401).json({ message: 'Unauthorized Request' });
}

module.exports = router;