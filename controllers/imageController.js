const Image = require('../models/imageModel')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const PATH = 'backup/image'
const storage = multer.diskStorage({
    destination: PATH,
    filename: (req,file, cb) => cb(null, file.originalname)
})

const upload = multer({storage: storage})

exports.upload = (req, res) => {
    const imageInfo = JSON.parse(req.body.imageInfo)
    const base64Data = req.body.image.replace(/^data:image\/jpeg;base64, /, "")
    console.log(imageInfo)
    var image = new Image()
    image.name = imageInfo.name
    image.author = imageInfo.author
    image.path = imageInfo.path
    image.save((err, data) => {
        if (err) console.error(err)
        var id = data.id
        console.log(id)
        var localPath = PATH+'/'+id+path.extname(image.path)
        base64_decode(base64Data, localPath)
        res.json({response: "upload success"})
    })
}

exports.sendImageInfo = (req, res) => {
    var author = req.params.author
    var imageInfos = []
    Image.find({author: author}, (err, imageInfos_) => {
        console.log(imageInfos_)
        imageInfos = imageInfos_
    }).then(()=>{
        res.send(imageInfos)
    })

}

exports.download = (req, res) => {
    var id = req.params.id
    Image.findById(id, (err, image) => {
        if (err) console.log(err)
        var localPath = PATH+'/'+id+path.extname(image.path)
        var base64str = base64_encode(localPath)
        res.send(base64str)
    })
}

function base64_encode(file) {
    var bitmap = fs.readFileSync(file)
    return new Buffer(bitmap).toString('base64')
}

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64')
    fs.writeFileSync(file, bitmap)
}
