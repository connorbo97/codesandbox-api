const firebase = require('firebase')
const config = require('./config')
require('firebase/firestore')

/**
 * firestore - instance of firestore
 * instead of this file, could pass around an instance of this vs each
 */
const firestore = firebase.initializeApp(config).firestore()

module.exports = firestore