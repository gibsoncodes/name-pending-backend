const mongoose = require('../db/connection'),
    Schema = mongoose.Schema;

const AuctionSchema = new Schema(
    {
        isActive: {
            type: Boolean,
            required: true,
        },
        artwork: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'artwork',
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
            ref: 'artwork'
        }],
        currentMax: Number,
    },
    {timestamps: true}
)


const Auction = mongoose.model('Auction', AuctionSchema)

module.exports = Auction;
