const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require('cookie-session');
const pcookie = require('passport-cookie')
const passport = require('passport');
const path = require('path')
const passportLocal = require("passport-local").Strategy;
const mongoose = require('./db/connection')
const bcrypt = require('bcryptjs')
const app = express();

const userController = require('./controllers/user')
const artController = require('./controllers/art')
const auctionController = require('./controllers/auction')
const bidController = require('./controllers/bid')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(session(({
    name: 'session',
    sameSite: 'none',
    maxAge: 60 * 1000 * 60,
    keys: ["xmkasdnk"],
})));

app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser("secretcode"))
app.use(passport.initialize());
app.use(passport.session());
require('./passport-config')(passport);

app.use(userController)
app.use(artController)
app.use(auctionController)
app.use(bidController)

app.set('trust proxy', 1)

app.get('/', (req, res) => {
    res.send('hi')
})


app.listen(process.env.PORT, () => console.log("dub"))


