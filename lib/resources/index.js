/**
 * Imports
 */
const {firestoreAddResource} = require('../firestore')

const resources = async function (sandboxID, body) {

	if(!sandboxID){
		console.log("Invalid sandboxID: " + sandboxID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID]}}
	} else if(!body || !body.external_resource){
		console.log("No body or no resource")
		console.log(body)
		return {error:true, data:{title:["No body or no resource"]}}
	}

	// database.ref(`sandboxes/${sourceID}/directories`).push(dirInfo)
	let result = await firestoreAddResource(sandboxID, body.external_resource)

	return result
}

module.exports = resources
