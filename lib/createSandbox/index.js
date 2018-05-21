/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreCreateSandbox} = require('../firestore')

const createSandbox = async function (template) {
	return await firestoreCreateSandbox(template)
}

module.exports = createSandbox
