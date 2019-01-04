const mongoose = require('mongoose')
const imageSchema = mongoose.Schema({
    name: {
        type: String, required: true
    },
    author: {
        type: String, required: true
    }, 
    path: {
        type: String, required: true
    },
    create_date: {
        type: Date, 
        default: Date.now
    }
})

const image = module.exports = mongoose.model('image', imageSchema)

module.exports.get = (cb, limit) => image.find(cb).limit(limit)