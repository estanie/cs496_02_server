
/*
POST api/user (data - facebook_id, name) // add
GET api/user/:userId return User Info

*/

const User = require('../models/userModel')

/**
 * userInfo: {
 *     facebook_id: "12345",
 *     name: "연가시"
 * }
 *  */
exports.add = (req, res) => {
    const userInfo = JSON.parse(JSON.stringify(req.body.userInfo))
    var user = new User()
    user.facebook_id = userInfo.facebook_id
    user.name = userInfo.name
    console.log(user)
    user.save((err, data) => {
        if (err) console.error(err)
    })
    res.send("done")
}

