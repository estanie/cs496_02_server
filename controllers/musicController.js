
// 기타정보는... 다 json에 때려박으면 되는거니까... 일단은... 틀만 짬

/*
GET api/music/like/:userid (return musicId List) -> userLike
GET api/music/user/playlist/:facebook_id (return playlistId) -> userPlaylist
GET api/music/playlist/:playlistId (return musicId List) -> playlistmusic
POST api/music/like (data - musicId, userId) => addUserLike
POST api/music/playlist (data - musicId!, userId!, playlistId?) -> addPlaylist
POST api/music/upload (data - musicId, userId, data) -> uploadMusic
POST api/music/like/cancel(data - musicId, userId) => cancelUserLike
*/

const User = require('../models/userModel')
const Music = require('../models/musicModel')
const UserPlaylist = require('../models/userPlaylistModel')
const PlaylistMusic = require('../models/playlistMusicModel')
const Like = require('../models/likeModel')
const PATH = 'backup/music'
const fs = require('fs')
const path = require('path')
const ObjectId = require('mongoose').Types.ObjectId

// * GET api/music/like/:userid (return musicId List) -> userLike
exports.userLike = (req, res) => {
    const userid = req.params.userid
    var objid = ""
    var likeList = []
    User.findOne({ facebook_id: userid }, (err, data) => {
        objid = data.id
    }).then(() => {
        console.log(objid)
        Like.find({ user_id: new ObjectId(objid) }, (err, data) => {
            if (err) console.log(err)
        })
            .populate('music_id')
            .exec((err, data) => {
                if (err) console.log(err)
                console.log(data)
                res.send(data)
            })
    })
}


// * GET api/music/user/playlist/:facebook_id (return playlistId) -> userPlaylist
exports.userPlaylist = (req, res) => {
    const facebook_id = req.params.facebook_id
    var userId = ""
    User.findOne({facebook_id: facebook_id}, (err, data) => {
        if (err) console.error(err)
        userId = data.id
    }).then(() => {
        UserPlaylist.find({user_id: userId}, (err, data) => {
            console.log(data)
            res.send(data)
        })
    })
}

// * GET api/music/playlist/:playlistid (return musicId List) -> playlistmusic
exports.playlistMusic = (req, res) => {
    const playlistid = req.params.playlistid
    PlaylistMusic.find({playlist_id: playlistid}, (err, data) => {
        if (err) console.error(err)
    }).populate('music_id')
    .populate({
        path: 'music_id',
        populate: {
            path: 'author',
            model: 'user'
        }
    })
    .exec((err, data) => {
        if (err) console.log(err)
        console.log(data)
        res.send(data)
    })
}

// * POST api/music/like (data - musicId, facebook_id) => addUserLike
exports.addUserLike = (req, res) => {
    const likeInfo = JSON.parse(JSON.stringify(req.body.likeInfo))
    var like = new Like()
    var userId = ""
    var musicId = ""
    User.findOne({ facebook_id: likeInfo.facebook_id }, (err, data) => {
        console.log("DATA")
        console.log(data)
        userId = data.id
    }).then(() => {
        Music.findOne({ _id: likeInfo.music_id }, (err, data) => {
            console.log(data)
            musicId = data.id
        }).then(() => {
            like.user_id = new ObjectId(userId)
            like.music_id = new ObjectId(musicId)
            console.log(like)
            like.save((err, data) => {
                if (err) console.error(err)
                res.send(like)
            })
        })
    })
}

// * POST api/music/playlist (data - musicId!, userId!, playlistId?) -> addMusicToPlaylist
exports.addMusicToPlayList = (req, res) => {
    const playlistInfo = JSON.parse(JSON.stringify(req.body.playlistInfo))
    var userId = ""
    UserPlaylist.findOne({ _id: playlistInfo.playlist_id }, (err, data) => {
        if (err) console.log(err)
        console.log("USER PLAYLIST"+data)
        var playlistMusic = new PlaylistMusic()
        playlistMusic.music_id = new ObjectId(playlistInfo.music_id)
        if (data === null) {
            User.findOne({facebook_id: playlistInfo.facebook_id}, (err, data) => {
              userId = data.id
            }).then(()=> {
                userPlaylist = new UserPlaylist()
                userPlaylist.user_id = new Object(userId)
                userPlaylist.save((err, data) => {
                    console.log("ADD USERPLAYLIST"+data)
                    playlistMusic.playlist_id = new ObjectId(data.id)
                    playlistMusic.save((err, data) => {
                        if (err) console.error(err)
                        console.log("ADD PLAYLISTMUSIC"+data)
                    })
                })
            })
        }
        else {
            playlistMusic.playlist_id = new ObjectId(playlistInfo.playlist_id)
            playlistMusic.save((err, data) => {
                if (err) console.log(err)
                console.log("EXISTDATA"+data)
            })
        }
    })
    res.send("done")
}


// * POST api/music/upload (data - musicId, userId, data) -> uploadMusic
exports.uploadMusic = (req, res) => {
    const musicInfo = JSON.parse(req.body.musicInfo)
    const musicData = req.body.music //TODO(gayeon): 이부분
    console.log(musicInfo)
    var music = new Music()
    console.log(musicInfo.name)
    console.log(musicInfo.author)
    music.name = musicInfo.name
    User.findOne({facebook_id: musicInfo.author}, (err, data) => {
        music.author = data.id
        music.save((err, data) => {
            if (err) console.error(err)
            var id = data.id
            console.log(id)
            var localPath = PATH + '/' + id + path.extname(music.name)
            fs.writeFile(localPath, musicData)
            res.json({ response: id })
        })
    })
}

// POST api/music/download/:musicid (return music) -> downloadMusic
exports.downloadMusic = (req, res) => {
    const musicid = req.params.musicid

}

// * POST api/music/like/cancel(data - musicId, userId) => cancelUserLike
exports.cancelUserLike = (req, res) => {
    const likeInfo = JSON.parse(JSON.stringify(req.body.likeInfo))
    var like = new Like()
    var userId = ""
    var musicId = ""
    User.findOne({ facebook_id: likeInfo.facebook_id }, (err, data) => {
        console.log("DATA")
        console.log(data)
        userId = data.id
    }).then(() => {
        Music.findOne({ _id: likeInfo.music_id }, (err, data) => {
            console.log(data)
            musicId = data.id
        }).then(() => {
            Like.find({
                music_id: new ObjectId(musicId),
                user_id: new ObjectId(userId)
            })
                .remove().exec()
        })
    })
    res.json({ response: "done" })
}

function base64_encode(file) {
    var bitmap = fs.readFileSync(file)
    return new Buffer(bitmap).toString('base64')
}

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64')
    fs.writeFileSync(file, bitmap)
}
