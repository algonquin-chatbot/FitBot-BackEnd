
const express = require('express')
const bodyParser = require('body-parser')
const firebase = require('firebase')
const config = require('./config.js')
const webhook = require('./webhook.js')
const authen = require('./auth.js')

firebase.initializeApp(config);

var app = express()
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
        res.status(200).json({ 'error' : null, 'message' : 'Yes, this works.'})
})
authen.signIn()
app.post('/webhook', webhook.queryWebhook)

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
