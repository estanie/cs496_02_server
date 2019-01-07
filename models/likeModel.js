const mongoose = require('mongoose')
const likeSchema = mongoose.Schema({
    music_id: {type: mongoose.Schema.Types.ObjectId, ref: "music"},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "user"}
})

const like = module.exports = mongoose.model('like', likeSchema)
module.exports.get = (cb, limit) => like.find(cb).limit(limit)
module.exports.getMusicLikeCount = (musicId) => 
{
    like.count({music_id: musicId})
}

module.exports.getUserLike = (userId) => like.find(userId)