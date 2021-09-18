const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        notifications: [{message: String, seen: Boolean}]
    }
)

const User = mongoose.model('User', UserSchema)

module.exports = User;