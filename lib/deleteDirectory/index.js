/**
 * Imports
 */
const {firestoreDeleteDirectory} = require('../firestore')

const deleteDirectory = async function (sandboxID, directoryID) {

	if(!sandboxID || !directoryID){
		//console.log("Invalid sandboxID or directoryID: " + sandboxID + " " + directoryID)
		return {error:true, data:{title:["Invalid sandboxID or directoryID: " + sandboxID + " " + directoryID]}}
	}

	// database.ref(`sandboxes/${sourceID}/directories`).push(dirInfo)
	let ok = await firestoreDeleteDirectory(sandboxID, directoryID)

	return ok
}

module.exports = deleteDirectory
