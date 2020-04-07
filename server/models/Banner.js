const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    title: {
        type: String
    },
    introduce: {
        type: String
    },
    imageUrl: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    hidden: {
        type: Boolean,
        default: true
    }
})
module.exports = mongoose.model('Banner', Schema)