const express = require("express")
const router = express.Router()
const Auction = require('../models/auction')

router.get('/art/auction', (req, res) => {
    Auction.find({isActive: true})
    .then(art => art.json())
    .then(res => res.send())
    .catch(err => console.error())
})

router.get('/art/auction/:id', (req, res) => {
    const id = req.params.id
    Auction.findById(id)
    .then(art => art.json())
    .then(res => res.send())
    .catch(err => console.error())
})

router.post('/art/auction', (req, res) => {
    Auction.create(req.body)
    .then(() => res.redirect('/auction'))
    .catch(err => console.error())
})



module.exports = router;