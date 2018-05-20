/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreCreateModule, firestoreGetModuleById} = require('../firestore')

const modules = async function (sandboxID, body) {
	let error = false
	if(!sandboxID){
		//console.log("Invalid sandboxID: " + sandboxID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID]}}
	} else if(!body || !body.module){
		//console.log("No body or no module")
		//console.log(body)
		return {error:true, data:{title:["No body or no module"]}}
	}

	let moduleInfo = body.module

	if(!moduleInfo.title){
		//console.log("No Title")
		return {error:true, data:{title:["No title"]}}
	}

	let newId = shortid.generate()
	moduleInfo.shortid = newId
	moduleInfo.id = newId

	moduleInfo.source_id = sandboxID
	moduleInfo.is_binary = null

	let success = firestoreCreateModule(sandboxID, moduleInfo)
	if(!success)
		return {error:true, data:{title:["Failed to create module"]}}

	return await firestoreGetModuleById(sandboxID, newId)
  
}

module.exports = modules
