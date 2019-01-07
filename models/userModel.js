const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    facebook_id: {
        type: String, required:true
    },
    name: {
        type: String, required:true
    }
})

const user = module.exports = mongoose.model('user', userSchema)
module.exports.get = (cb) => user.find(cb)