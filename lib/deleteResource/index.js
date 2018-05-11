/**
 * Imports
 */
const {firestoreDeleteResource} = require('../firestore')

const deleteResource = async function (sandboxID, body) {

	if(!sandboxID){
		console.log("Invalid sandboxID: " + sandboxID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID]}}
	} else if(!body || !body.id){
		console.log("No body or no resource")
		console.log(body)
		return {error:true, data:{title:["No body or no resource"]}}
	}


	// database.ref(`sandboxes/${sourceID}/directories`).push(dirInfo)
	let result = await firestoreDeleteResource(sandboxID, body.id)

	return result
}

module.exports = deleteResource
