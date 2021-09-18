const express = require("express")
const router = express.Router()
const Artwork = require('../models/artwork')
const { isAdmin } = require("./auth")

router.get('/art', (req, res) => {  
    Artwork.find({})
    .then(art => {
        res.send(art)
    })
    .catch(err => console.error())
})

router.get('/art/:id', (req, res) => {
    const id = req.params.id
    Artwork.findById(id)
    .then(art => art.json())
    .then(res => res.send())
    .catch(err => console.error())
})

router.post('/art', isAdmin, (req, res) => {
    Artwork.create(req.body)
    .then(() => res.redirect('/art'))
    .catch(err => console.error())
})



module.exports = router;