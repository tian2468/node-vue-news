const mongoose = require('mongoose')
const bcrytp = require('bcrypt')
const Schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false,
        set(val) {
            return bcrytp.hashSync(val, 10)
        }
    }
})
module.exports = mongoose.model('User', Schema)