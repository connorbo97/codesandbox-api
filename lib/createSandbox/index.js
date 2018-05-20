/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreCreateSandbox} = require('../firestore')

const createSandbox = async function (template) {
	return firestoreCreateSandbox(template)
}

module.exports = createSandbox
