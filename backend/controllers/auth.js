require('dotenv').config()

module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({msg: "not logged in"})
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(process.env, 999)
        if (req.user.username = process.env.ADMIN_USER) {
            next();
        } else {
            res.status(401).json({msg: "not logged in"})
        }
    } else {
        res.status(401).json({msg: "not logged in"})
    }
}