
const express = require('express')
const bodyParser = require('body-parser')
const firebase = require('firebase')
const config = require('./config.js')
const webhook = require('./webhook.js')
const authen = require('./auth.js')

firebase.initializeApp(config);

var app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
        res.status(200).json({ 'error' : null, 'message' : 'Yes, this works.'})
})
authen.signIn()
app.post('/webhook', webhook.queryWebhook)

app.listen(8080)
console.log("Listening on port 8080...")
