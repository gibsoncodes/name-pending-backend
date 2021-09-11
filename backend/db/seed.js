const artworks = require('./seed.json');
const mongoose = require('../db/connection')
const Artwork = require('../models/artwork')


Artwork.deleteMany({})
    .then(() => Artwork.insertMany(artworks))
    .then(console.log)
    .catch(console.error)
    .finally(() => process.exit())


