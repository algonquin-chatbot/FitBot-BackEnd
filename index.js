
const express = require('express')
const bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
        res.status(200).json({ 'error' : null, 'message' : 'Yes, this works.'})
})

app.listen(8080)
console.log("Listening on port 8080...")
