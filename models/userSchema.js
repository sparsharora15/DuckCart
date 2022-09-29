const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    }
})
const User = mongoose.model('User', userSchema)
module.exports =User