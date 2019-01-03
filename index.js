const express = require('express')
const app = express()
const PORT = 80
const image = require('./route/image')

app.get('/', (req, res) => res.send('Hello'))
app.listen(PORT, () => console.log('running server on port'+PORT))
app.use('/api/image', image)