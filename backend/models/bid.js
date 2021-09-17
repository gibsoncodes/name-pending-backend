const mongoose = require('../db/connection'),
    Schema = mongoose.Schema;

const BidSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        auction: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'auction',
            required: true,
        },
        bidAmount: {
            type: Number,
            required: true,
        },
        expires: {
            type: Date,
            required: true,
        },
        won: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    {timestamps: true}
)

const Bid = mongoose.model('Bid', BidSchema);

module.exports = Bid;