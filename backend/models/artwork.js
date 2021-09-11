const mongoose = require('../db/connection'),
    Schema = mongoose.Schema;

const ArtworkSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        pictures: [String],
        description: {
            type: String,
            required: true,
        },
        materials: {
            type: String,
            required: true,
        },
        startPrice: {
            type: Number,
            required: true,
        },
        isSold: {
            type: Boolean,
            default: false,
        }
    }
)

const Artwork = mongoose.model('Artwork', ArtworkSchema)

module.exports = Artwork;


