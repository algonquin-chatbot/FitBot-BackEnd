/*
        Endpoint defintions for firebase queries.
 */

const firebase = require('firebase')

module.exports.queryFirebase = (req, res) => {
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
}
