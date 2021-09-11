const express = require("express")
const router = express.Router()
const Bid = require('../models/bid')

router.get('/art/auction/bid', (req, res) => {
    Auction.find({isActive: true})
    .then(art => art.json())
    .then(res => res.send())
    .catch(err => console.error())
})

router.get('/art/auction/bid/:id', (req, res) => {
    const id = req.params.id
    Auction.findById(id)
    .then(art => art.json())
    .then(res => res.send())
    .catch(err => console.error())
})

router.post('/art/auction/bid', (req, res) => {
    Bid.create(req.body)
    .then((bid) => {
        Auction.findByIdAndUpdate({_id: id}, {"$push": {bidHistory: bid}})
        .then(() => res.redirect('/art/auction/bid'))
        .then(err => console.log(err))
    })
})
