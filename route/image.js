const router = require('express').Router()

router.get('/',(req, res) => {
    res.json({
        status: 'API WORK',
        message: 'API'
    })
})

module.exports = router