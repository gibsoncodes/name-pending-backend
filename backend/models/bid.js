const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const BidSchema = new Schema(
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