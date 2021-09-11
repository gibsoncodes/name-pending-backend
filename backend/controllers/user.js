const express = require("express")
const router = express.Router()
const passport = require('passport');
const passportLocal = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');


router.get('/user', (req, res) => {
    res.send(req.user)
})

router.post('/user/new', (req, res) => {
    console.log(req.body)
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Exists")
        if (!doc) {
            const hashedPass = await bcrypt.hash(req.body.password, 10)
            const newUser = new User({
                username: req.body.username,
                password: hashedPass,
                email: req.body.email,
            })
            await newUser.save();
            res.send("User Created")
        }
    })
})

router.post('/user/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("no User exists");
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send("successful authentication");
                console.log(req.user)
            })
        }
    })(req, res, next)
});




module.exports = router;