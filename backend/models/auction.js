const mongoose = require('../db/connection'),
    Schema = mongoose.Schema;

const AuctionSchema = new Schema(
    {
        isActive: {
            // 'upcoming', 'active', 'past'
            type: String,
            required: true,
        },
        artwork: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'artwork',
            },
            name: String,
        },
        time: {

            start: {
                type: Date,
                required: true,
            },
            
            //Hours
            end: {
                type: Date,
                required: true,
            }
        },
        bidHistory: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bid'
        }],
        winner: {
            winningId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            username: String,
        },
        currentMax: Number,
    },
    {timestamps: true}
)


const Auction = mongoose.model('Auction', AuctionSchema)

module.exports = Auction;
