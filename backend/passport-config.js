const User = require('./models/user');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
require('dotenv').config()


module.exports = function(passport) {

    passport.use(
        new localStrategy({ usernameField: 'email' }, (username, password, done) => {
            User.findOne({ email: username }, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
            })
        })
    )

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    })

    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            const admin = user.username === process.env.ADMIN_USER;
            const userInfo = {
                username: user.username,
                admin: admin,
                notifications: user.notifications,
            }
            cb(err, userInfo);
        })
    })

}