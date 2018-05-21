/**
 * Imports
 */

const {firestoreUpdateModuleById, firestoreGetModuleById, firestoreUpdateMultipleModules} = require('../firestore')

const updateModules = async function (sandboxID, moduleID, body) {
	let error = false
	if(!sandboxID || !moduleID){
		//console.log("Invalid sandboxID: " + sandboxID + " or moduleID: " + moduleID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID + " or moduleID: " + moduleID]}}
	} else if(!body){
		//console.log("No body ")
		//console.log(body)
		return {error:true, data:{title:["No body"]}}
	}
	// console.log(body.module)
	// let moduleInfo = JSON.parse(body.module)

	let ok = false

	//mupdate used to update mutliple modules
	try{
		if(moduleID == "mupdate"){
			if(!body.modules){
				console.log("hey")
				//console.log("No modules")
				//console.log(body)
				return {error:true, data:{title:["No modules provided"]}}
			}
			success = await firestoreUpdateMultipleModules(sandboxID, body.modules)
			return {error:false, data:body.modules}
		} else {
			if(!body.module || !body.module.code){
				//console.log("No module or code")
				//console.log(body)
				return {error:true, data:{title:["No module or code provided"]}}
			}
			success = await firestoreUpdateModuleById(sandboxID, moduleID, body.module)
		}
	} catch (err){
		return {error:true, data:{title:["Failed to update module"]}}
	}
	
	if(!ok)
		return {error:true, data:{title:["Failed to update module"]}}

	return await firestoreGetModuleById(sandboxID, moduleID)
  
}

module.exports = updateModules
