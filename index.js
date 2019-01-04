const express = require('express')
const app = express()
const PORT = 80
const route = require('./api-route')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const connect = require('connect')
const cookieParser = require('cookie-parser')

app.use(express.static(__dirname + '/public'))

app.use(cookieParser())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

mongoose.connect('mongodb://localhost:27017/cs496_02', {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', console.error)
db.once('open',() => {console.log("Connect to mongod server")})

app.get('/', (req, res) => res.send('Hello'))
app.listen(PORT, () => console.log('running server on port'+PORT))
app.use('/api', route)
