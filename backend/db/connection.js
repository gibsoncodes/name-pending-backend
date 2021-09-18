const mongoose = require("mongoose")
require('dotenv').config()
const DB_CREDENTIALS = process.env.DB_CREDENTIALS

const mongoURI = `mongodb+srv://${DB_CREDENTIALS}@cluster0.ok0qo.mongodb.net/testingArt?retryWrites=true&w=majority`;

mongoose
    .connect(mongoURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        )
    .then( (instance) => 
        console.log(`Connected to db: ${instance.connections[0].name}`)
    )
    .catch( (err) => console.log(`Connection to db failed due to: ${err}`))


module.exports = mongoose