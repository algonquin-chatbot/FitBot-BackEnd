/*
        Endpoint definition for webhooks.
 */

const firebase = require('firebase')

module.exports.queryWebhook = (req, res) => {
        if (req.body.result.action === 'getExercise') {

                processExercise(req).then( (data) => {
                        res.setHeader('Content-Type', 'application/json')
                        res.status(200).json(data)
                })
        }
}

function processExercise(req) {
        console.log("Processing exercise ... ");

        // Extract data based on a parameter
        var parameter = req.body.result.parameters

        // query firebase
        return firebase.database().ref('/category').once('value').then( (result) => {
                var speech = result.val().arms[0].description
                var data = result.val().arms

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
