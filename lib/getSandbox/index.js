/**
 * Imports
 */

const {firestoreGetSandboxById} = require('../firestore')

const getSandbox = async function (sandboxID) {

	if(!sandboxID){
		//console.log("Invalid sandboxID: " + sandboxID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID]}}
	}

	return await firestoreGetSandboxById(sandboxID)
  
}

module.exports = getSandbox
