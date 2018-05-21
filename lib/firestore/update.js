const firestore = require('./firestore')

/**
 * firestoreUpdateSandboxById - update the data of a sandbox
 * 
 * @param {any} sandboxId 	- id of the sandbox to be read
 * @param {any} sandboxInfo - JSON to be merged with the sandbox document
 * @returns {bool}
		true if succeeded, false if anything went wrong
 */
const firestoreUpdateSandboxById = async function(sandboxId, sandboxInfo){
	//console.log(`Updating sandbox ${sandboxId}....`)

	try{
		let curDate = new Date()
		sandboxInfo.update_at = curDate.toISOString()
		await firestore.collection('sandboxes').doc(sandboxId).update(sandboxInfo)
		//console.log(`Found and updated sandbox ${sandboxId}`)
	} catch(err){
		console.log(`Couldn't find sandbox ${sandboxId}`)
		console.log(err)
		return false
	}

	return true
}

/**
 * firestoreUpdateDirectoryById - update the data of a directory for a sandbox
 * 
 * @param {any} sandboxId 	- id of the sandbox to be read
 * @param {any} dirId 		- id of the directory to be updated
 * @param {any} dirInfo 	- JSON to be merged with the directory data
 * @returns {bool}
	true if succeeded, false if anything went wrong
 */
const firestoreUpdateDirectoryById = async function(sandboxId, dirId, dirInfo){
	//console.log(`Updating directory ${dirId} from ${sandboxId}....`)

	try{
		let curDate = new Date()
		let obj = {
			update_at: curDate.toISOString(),
			directories: {
				[dirId]: dirInfo
			}
		}
		//console.log(obj)
		await firestore.collection('sandboxes').doc(sandboxId).set(obj, {merge:true})
		//console.log(`Found and updated directory ${dirId} from ${sandboxId}`)
	} catch(err){
		console.log(`Couldn't find directory ${dirId} in sandbox ${sandboxId}`)
		console.log(err)
		return false
	}

	return true
}

/**
 * firestoreUpdateModuleById - update the document of a module for a sandbox
 * 
 * @param {any} sandboxId 	- id of the sandbox to be read
 * @param {any} moduleId 	- id of the module to be updated
 * @param {any} moduleInfo 	- JSON to be merged with the module document
 * @returns {bool}
	true if succeeded, false if anything went wrong
 */
const firestoreUpdateModuleById = async function(sandboxId, moduleId, moduleInfo){
	//console.log(`Updating module ${moduleId} from ${sandboxId}....`)

	try{
		let curDate = new Date()
		await firestore.collection('sandboxes').doc(sandboxId).update({update_at:curDate.toISOString()})
		await firestore.collection('sandboxes').doc(sandboxId).collection('modules').doc(moduleId).update(moduleInfo)
		//console.log(`Found and updated module ${moduleId} from ${sandboxId}`)
	} catch(err){
		console.log(`Couldn't find module ${moduleId} in sandbox ${sandboxId}`)
		console.log(err)
		return false
	}

	return true
}

/*
	firestoreUpdateMultipleModules
	Function:
		updates multiple modules for a sandbox
	Params:
		sandboxId: id of the sandbox to be read
		modules: array of JSON's of module data
	Return:
		true if succeeded, false if anything went wrong
/**
 * firestoreUpdateMultipleModules - updates multiple modules for a sandbox
 * 
 * @param {any} sandboxId 	- id of the sandbox to be read
 * @param {any} modules 	- array of JSON's to be merged with module documents
 * @returns {bool}
	true if succeeded in updating all modules, false if any module update fails
 */
const firestoreUpdateMultipleModules = async function(sandboxId, modules){
	//console.log(`Updating multiple modules for ${sandboxId}....`)

	try{
		let curDate = new Date()
		await firestore.collection('sandboxes').doc(sandboxId).update({update_at:curDate.toISOString()})

		let modCollec = firestore.collection('sandboxes').doc(sandboxId).collection('modules')
		let tasks = []

		modules.forEach((mod)=>{
			tasks.push(modCollec.doc(mod.id).update(mod))
		})
		await Promise.all(tasks)
		
		//console.log(`Found and updated modules for ${sandboxId}`)
	} catch(err){
		console.log(`Couldn't find modules for sandbox ${sandboxId}`)
		console.log(err)
		return false
	}

	return true
}
module.exports = {
    firestoreUpdateSandboxById,
    firestoreUpdateDirectoryById,
    firestoreUpdateModuleById,
    firestoreUpdateMultipleModules
}