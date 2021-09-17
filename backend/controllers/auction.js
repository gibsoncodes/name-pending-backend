const express = require("express")
const Artwork = require("../models/artwork")
const router = express.Router()
const Auction = require('../models/auction')
const isAdmin = require('./auth').isAdmin;

router.get('/auctions/upcoming', (req, res) => {
    Auction.find({isActive: 'upcoming'})
    .then(auctions => {
        res.send(auctions)
        auctions.forEach(auc => {
            let start = new Date(auc.time.start);
            if (start < Date.now()) {
                auc.updateOne({$set: {isActive: 'active'}})
            }
        })
    })
    .catch(err => console.error())
})

router.get('/auctions/active', (req, res) => {
    console.log("herro")
    Auction.find({})
    .then(auctions => {
        let passed = [];
        auctions.forEach(auc => {
            if (auc.isActive === 'active') {
                passed.push(auc);
            } else {
                let start = new Date(auc.time.start);
                if (start < Date.now()) {
                    passed.push(auc);
                    auc.updateOne({$set: {isActive: 'active'}})
                }
            }
        })
        res.send(passed)
    })
    .catch(err => console.error())
})

router.get('/auctions/past', (req, res) => {
    Auction.find({isActive: 'past'})
    .then(auctions => {
        res.send(auctions)
    })
    .catch(err => console.error())
})

router.get('/art/auctions/:id', (req, res) => {
    const id = req.params.id
    Auction.findById(id)
    .then(res => res.send())
    .catch(err => console.error())
})

router.get('/art/auctions/:id/end', (req, res) => {
    const id = req.params.id
    Auction.findById(id)
    .then(auc => {
        let lastBid = auc.bidHistory[bidHistory.length - 1]
        auc.updateOne({$set: {'winner.winningId': lastBid.user, 'winner.username': lastBid.username}})
        // further functionality, email, etc

        Bid.find({_id: lastBid._id})
        .then(bid => {
            bid.updateOne({$set: {won: true}})
        })
    })
    .catch(err => console.error())
})

router.post('/auctions', isAdmin, (req, res) => {
    Artwork.findOne({id: req.body.artwork})
    .then(artwork => {
        let endDate = new Date(req.body.time.start)
        let duration = parseInt(req.body.time.duration)
        endDate.setHours(endDate.getHours() + duration)
        const newAuction = {
            isActive: 'upcoming',
            artwork: artwork.id,
            time: {
                start: req.body.time.start,
                end: endDate,
            },
            bidHistory: [],
            currentMax: artwork.startPrice,
        }
        Auction.create(newAuction)
        .then((auction) => res.send(auction))
        .catch(err => console.error())
    })
})



module.exports = router;