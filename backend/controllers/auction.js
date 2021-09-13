const express = require("express")
const Artwork = require("../models/artwork")
const router = express.Router()
const Auction = require('../models/auction')


router.get('/art/auction', (req, res) => {
    Auction.find({isActive: true})
    .then(res => res.send())
    .catch(err => console.error())
})

router.get('/art/auction/:id', (req, res) => {
    const id = req.params.id
    Auction.findById(id)
    .then(res => res.send())
    .catch(err => console.error())
})

router.post('/art/auction', (req, res) => {

    Artwork.findOne({id: req.body.artwork}).then(artwork => {
        console.log(req.body)
        console.log(artwork)
        let endDate = new Date(req.body.time.start)
        endDate.setHours(endDate.getHours() + req.body.time.duration)
        const newAuction = {
            isActive: false,
            artwork: artwork.id,
            time: {
                start: req.body.time.start,
                end: endDate,
            },
            bidHistory: [],
            currentMax: artwork.startPrice,
        }
        console.log(newAuction)
        Auction.create(newAuction)
        .then((auction) => res.send(auction))
        .catch(err => console.error())
    })
})



module.exports = router;