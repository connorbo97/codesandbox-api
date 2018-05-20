/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreDeleteSandboxById} = require('../firestore')

const deleteSandbox = async function (sandboxID) {
	if(!sandboxID){
		//console.log("Invalid sandboxID: " + sandboxID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID]}}
	} 
	
	return await firestoreDeleteSandboxById(sandboxID) ? {error:false, data:{}} : {error:true, data:{title:["Failed to delete sandbox " + sandboxID]}}


}

module.exports = deleteSandbox
