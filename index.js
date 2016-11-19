
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

app.post('/webhook', (req, res) => {
        if (req.body.result.action === 'getExercise') {

                processExercise(req).then( (data) => {
                        res.setHeader('Content-Type', 'application/json')
                        res.status(200).json(data)
                })
        }
})

function processExercise(req) {
        console.log("Processing exercise ... ");

        // Extract data based on a parameter
        let parameter = req.body.result.parameters

        // query firebase
        return firebase.database().ref('/category').once('value').then( (result) => {
                let speech = result.val().arms[0].description
                let data = result.val().arms

                console.log(speech);
                console.log(data);

                return {
                        "speech" : speech,
                        "displayText" : "testDisplayText",
                        "data" : data,
                        "source" : "FitBot-firebase"
                }

        }).catch((error) => {
                console.log(error);
        })
}


app.listen(8080)
console.log("Listening on port 8080...")
