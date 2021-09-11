import mongoose from '../db/connection'

const BidSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        bidAmount: {
            type: Number,
            required: true,
        }
    },
    {timestamps: true}
)

const Bid = mongoose.model('Bid', BidSchema);

module.exports = Bid;