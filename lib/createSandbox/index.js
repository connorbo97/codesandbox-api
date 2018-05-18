/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreCreateSandbox} = require('../firestore')

const createSandbox = async function () {
	let args = {}
	args["id"] = shortid.generate()
	args["template"] = "create-react-app"
	//console.log(args)
	return firestoreCreateSandbox("svelte")


}

module.exports = createSandbox
