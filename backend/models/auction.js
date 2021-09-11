
import mongoose from '../db/connection'

const AuctionSchema = new mongoose.Schema(
    {
        isActive: {
            type: Boolean,
            required: true,
        },
        artwork: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'artwork'
        },
        time: {
            start: {
                type: String,
                required: true,
            },
            end: {
                type: String,
                required: true,
            }
        },
        bidHistory: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'artwork'
        }],
        currentMax: Number,
    }
)


const Auction = mongoose.model('Auction', AuctionSchema)

module.exports = Auction;
