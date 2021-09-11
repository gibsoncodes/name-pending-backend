const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
const passportLocal = require("passport-local").Strategy;
const mongoose = require('./db/connection')
const bcrypt = require('bcryptjs')
const app = express();
const User = require('./models/user')

const userColtroller = require('./controllers/user')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session(({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
})));

app.use(cookieParser("secretcode"))
app.use(passport.initialize());
app.use(passport.session());
require('./passport-config')(passport);

app.use(userColtroller)



app.listen(4000, () => console.log("dub"))


