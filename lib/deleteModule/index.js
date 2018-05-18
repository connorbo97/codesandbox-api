/**
 * Imports
 */
const {firestoreDeleteModule} = require('../firestore')

const deleteModule = async function (sandboxID, moduleID) {

	if(!sandboxID || !moduleID){
		//console.log("Invalid sandboxID or moduleID: " + sandboxID + " " + moduleID)
		return {error:true, data:{title:["Invalid sandboxID or moduleID: " + sandboxID + " " + moduleID]}}
	}

	// database.ref(`sandboxes/${sourceID}/directories`).push(dirInfo)
	let ok = await firestoreDeleteModule(sandboxID, moduleID)

	return ok
}

module.exports = deleteModule
