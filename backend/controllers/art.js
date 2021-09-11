const express = require("express")
const router = express.Router()
const Artwork = require('../models/artwork')

router.get('/art', (req, res) => {  
    console.log("hi")
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

router.post('/art', (req, res) => {
    Artwork.create(req.body)
    .then(() => res.redirect('/art'))
    .catch(err => console.error())
})



module.exports = router;