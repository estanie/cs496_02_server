const mongoose = require('mongoose')
const musicSchema = mongoose.Schema({
    name: {
        type: String, required: true
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    uploaded_date: {
        type: Date,
        default: Date.now
    }
})

const music = module.exports = mongoose.model('music', musicSchema)
module.exports.get = (cb) => music.find(cb)