const express = require("express")
const Artwork = require("../models/artwork")
const router = express.Router()
const Auction = require('../models/auction')
const User = require('../models/user')
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
    Auction.find({})
    .then(auctions => {
        console.log(auctions)
        let passed = [];
        Array.of(auctions).forEach(auc => {
            console.log(auc)
            if (auc.isActive === 'active') {
                passed.push(auc);
            } else{
                let start = new Date(auc.time.start);
                let end = new Date(auc.time.end)
                if (start < Date.now()) {
                    passed.push(auc);
                    auc.updateOne({$set: {isActive: 'active'}})
                } else if (end < Date.now()) {
                    console.log("hit")
                    auc.updateOne({$set: {isActive: 'past'}})
                    endAuction(auc._id)
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

function endAuction(id) {
    console.log("heree4")
    Auction.findById(id)
    .then(auc => {
        let lastBid = auc.bidHistory[bidHistory.length - 1]
        (async () => {
            auc.updateOne({$set: {'winner.winningId': lastBid.user, 'winner.username': lastBid.username}})
            Bid.find({_id: lastBid._id})
            .then(bid => {
                const notifObj = {
                    message: `You've won the auction for the incredible piece ${auc.artwork.name}`,
                    seen: false,
                };
                bid.updateOne({$set: {won: true}})
                User.findOneAndUpdate({username: bid.username}, {$push: {notifications: notifObj}})
            })
        })()
    })
    .catch(err => console.error())
}

router.post('/auctions', isAdmin, (req, res) => {
    Artwork.findById({_id: req.body.artwork})
    .then(artwork => {
        let endDate = new Date(req.body.time.start)
        console.log(endDate)
        let duration = parseInt(req.body.time.duration)
        console.log(duration)
        endDate.setHours(endDate.getHours() + duration)
        console.log(endDate)
        const newAuction = {
            isActive: 'upcoming',
            artwork: {id: artwork.id, name: artwork.name},
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