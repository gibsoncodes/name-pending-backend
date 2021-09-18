const express = require("express")
const router = express.Router()
const Bid = require('../models/bid')
const User = require('../models/user')
const Auction = require('../models/auction')
const passport = require('passport')
const isAuth = require('./auth').isAuth

router.get('/bids/active', isAuth, (req, res) => {
    console.log(req.user)
    Bid.find({username: req.user.username})
    .then(bids => {
        let curr = Date.now();
        curr = curr.getTime();
        let passed = bids.filter(bid => {
            console.log("kasdokajs")
            return curr <= end;
        });
        res.send(passed)
    })
    .catch(err => console.error())
})

router.get('/bids/all', (req, res) => {
    Bid.find({user: req.user.username})
    .then(bids => res.send(bids))
    .catch(err => console.error())
})

router.get('/bids/won', isAuth, (req, res) => {
    Bid.find({user: req.user.username}, {won: true})
    .then(bids => {
        res.send(bids)
    })
    .catch(err => console.error())
})

router.get('/bids/:id', isAuth, (req, res) => {
    const id = req.params.id
    Bid.findById(id)
    .then(bid => res.send(bid))
    .catch(err => console.error())
})

router.post('/bids', isAuth, (req, res) => {
    const auctionId = req.body.auctionId;
    User.findOne({username: req.user.username})
    .then(user => {
        const newBid = {
            user: user._id,
            username: user.username,
            auction: auctionId,
            bidAmount: req.body.bid,
        }
        Auction.findById({_id: auctionId})
        .then((auction) => {
            if (auction.currentMax + 1 <= newBid.bidAmount) {
                Bid.create({...newBid, expires: auction.time.end})
                .then((bid) => {
                    (async () => {
                        await auction.updateOne({$push: {bidHistory: bid}});
                        await auction.updateOne({$set: {currentMax: bid.bidAmount}});
                    })()
                    .then(() => res.status(200).send())
                })
                .catch(err => res.status(404).send())
            } else {
                res.status(409).send()
            }
        })
    })
    .catch((err) => {
        res.status(404).send("No User Found");
    })
})

module.exports = router;