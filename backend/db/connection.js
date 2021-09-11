const mongoose = require("mongoose")

const mongoURI = "mongodb+srv://gibsoncodes:D3xtroverse@cluster0.ok0qo.mongodb.net/testingArt?retryWrites=true&w=majority"

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