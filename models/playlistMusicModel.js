const mongoose = require('mongoose')
const playlistMusicSchema = mongoose.Schema({
    music_id: {type: mongoose.Schema.Types.ObjectId, ref: "music"},
    playlist_id: {type: mongoose.Schema.Types.ObjectId, ref: "userplaylist"}
})

const playlistMusic = module.exports = mongoose.model('playlistmusic', playlistMusicSchema)
module.exports.get = (cb) => playlistMusic.find(cb)