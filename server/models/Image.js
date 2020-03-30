const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    name: {
        type: String
    },
    imageUrl: {
        type: String
    }
})
module.exports = mongoose.model('Image', Schema)