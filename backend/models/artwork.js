import mongoose from '../db/connection'

const ArtworkSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
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
            require: true,
        }
    }
)

const Artwork = mongoose.model('Artwork', ArtworkSchema)

module.exports = Artwork;


