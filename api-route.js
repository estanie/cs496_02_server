const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({
        status: 'API WORKS',
        message: 'Welcome'
    })
})

const imageController = require('./controllers/imageController')
const userController = require('./controllers/userController')
const musicController = require('./controllers/musicController')

router.route('/images')
    .post(imageController.upload)

router.route('/images/:author')
    .get(imageController.sendImageInfo)

router.route('/images/download/:id')
    .get(imageController.download)

router.route('/user')
    .post(userController.add)

/*
OK GET api/music/like/:userid (return musicId List) -> userLike
OK GET api/music/user/playlist/:facebook_id (return playlistId) -> userPlaylist
OK GET api/music/playlist/:playlistId (return musicId List) -> playlistmusic
OK POST api/music/like (data - musicId, userId) => addUserLike
OK POST api/music/playlist (data - musicId!, userId!, playlistId?) -> addMusicToPlayList
POST api/music/upload (data - musicId, userId, data) -> uploadMusic
POST api/music/download/:musicid (return music, musicInfo) -> downloadMusic
OK POST api/music/like/cancel(data - musicId, userId) => cancelUserLike
*/

router.route('/music/like/:userid')
    .get(musicController.userLike)

router.route('/music/user/playlist/:facebook_id')
    .get(musicController.userPlaylist)

router.route('/music/playlist/:playlistid')
    .get(musicController.playlistMusic)

router.route('/music/like')
    .post(musicController.addUserLike)

router.route('/music/playlist')
    .post(musicController.addMusicToPlayList)

router.route('/music/upload')
    .post(musicController.uploadMusic)

router.route('/music/download')
    .post(musicController.downloadMusic)

router.route('/music/like/cancel')
    .post(musicController.cancelUserLike)

module.exports = router
