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
        let parameter = req.body.result.parameters.body_parts

        // query firebase
        return firebase.database().ref('/exercisesByBodyPart').once('value').then( (result) => {

                let bodyPartdata = result.val()[parameter]

                let speech
                let data

                // Filter out based on recommendation - ugly
                // TODO: Better implementation plz
                for(var i=0; i < bodyPartdata.length; i++){
                        if (bodyPartdata[i].rating === 5) {
                                speech = bodyPartdata[i].description
                                data = bodyPartdata[i]
                                break
                        }
                }

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
