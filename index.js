
const express = require('express')
const bodyParser = require('body-parser')
const firebase = require('firebase')
const config = require('./config.js')

var app = express()

app.use(bodyParser.json())

firebase.initializeApp(config);

app.get('/', (req, res) => {
        res.status(200).json({ 'error' : null, 'message' : 'Yes, this works.'})
})

app.get('/exercise', (req, res) => {
        firebase.auth().signInWithEmailAndPassword('admin@admin.com', 'adminadmin').then( () => {
                console.log('Login succesfull!')
                firebase.database().ref('/category').once('value').then( (data) => {
                        res.status(200).json(data.val())
                }).catch((error) => {
                        console.log(error);
                })
        })
        .catch((error) => {
                console.log(error)
        })
})


app.listen(8080)
console.log("Listening on port 8080...")
