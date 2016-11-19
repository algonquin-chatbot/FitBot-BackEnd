/*
        Endpoint defintions for firebase queries.
 */

const firebase = require('firebase')

module.exports.signIn = function signIn() {
        firebase.auth().signInAnonymously().then( () => {
                console.log('Login succesfull!')
        })
        .catch((error) => {
                console.log(error)
        })
}
