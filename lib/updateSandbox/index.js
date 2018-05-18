/**
 * Imports
 */

const {firestoreUpdateSandboxById, firestoreGetSandboxById} = require('../firestore')

const updateModules = async function (sandboxID, body) {
	if(!sandboxID){
		//console.log("Invalid sandboxID: " + sandboxID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID]}}
	} else if(!body || !body.sandbox){
		//console.log("No body or no sandbox")
		//console.log(body)
		return {error:true, data:{title:["No body or no sandbox"]}}
	}
	// let sandboxInfo = JSON.parse(body.sandbox)
	let sandboxInfo = body.sandbox

	let success = firestoreUpdateSandboxById(sandboxID, sandboxInfo)

	if(!success)
		return {error:true, data:{title:["Failed to update sandbox"]}}

	return await firestoreGetSandboxById(sandboxID)
  
}

module.exports = updateModules
