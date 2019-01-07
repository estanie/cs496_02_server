const mongoose = require('mongoose')
const userPlaylistSchema = mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "user"}
})

const userPlaylist = module.exports = mongoose.model('userplaylist', userPlaylistSchema)
module.exports.get = (cb) => userPlaylist.find(cb)