const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({
        status: 'API WORKS',
        message: 'Welcome'
    })
})

const imageController = require('./controllers/imageController')

router.route('/images')
    .post(imageController.upload)

router.route('/images/:author')
    .get(imageController.sendImageInfo)

router.route('/images/download/:id')
    .get(imageController.download)
module.exports = router
