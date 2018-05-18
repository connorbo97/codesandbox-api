/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreForkSandbox} = require('../firestore')

const fork = async function (sandboxID) {

	if(!sandboxID){
		//console.log("Invalid sandboxID: " + sandboxID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID]}}
	}

	let result = await firestoreForkSandbox(sandboxID, shortid.generate())

	return result
}

module.exports = fork