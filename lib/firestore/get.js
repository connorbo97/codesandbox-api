const firestore = require('./firestore')

/**
 * firestoreGetSandboxById - get the data representation of a sandbox
 * 
 * @param {string} sandboxId - id of the sandbox to be read
 * @returns {json}
	{
		error: false if succeeded, true if anything went wrong
		data: if there was an error, JSON like {title:["TO BE DONE"]}
				if everything went fine, a JSON representing the data of the sandbox
	}
 */
const firestoreGetSandboxById = async function (sandboxId) {
	//console.log(`Reading sandbox ${sandboxId}....`)

	let data = {title:["TO BE DONE"]}

	try{
		let doc = await firestore.collection('sandboxes').doc(sandboxId).get()
		if(doc.exists){
			data = doc.data()
			//console.log(`Found and read sandbox ${sandboxId}`)
		} else {
			console.log(`Couldn't find sandbox ${sandboxId}`)
			return {error:true, data}
		}

		let dirArr = []

		for(var id in data.directories)
			dirArr.push(data.directories[id])

		data.directories = dirArr
		let collect = await firestore.collection('sandboxes').doc(sandboxId).collection('modules').get()

		let modules = []
		if(collect.docs.length > 0){
			collect.forEach((snap)=>{
				modules.push(snap.data())
			})
		}

		data["modules"] = modules

	} catch(err){
		console.log(`Couldn't get sandbox ${sandboxId}`)
		console.log(err)
		return {error:true, data};
	}

	return {error:false, data}
}

/**
 * firestoreGetDirById - get the data representation of a directory in a sandbox
 * 
 * @param {any} sandboxId  	- id of the sandbox to be read
 * @param {any} shortId 	- id of the directory to be read
 * @returns {json}
	{
		error: false if succeeded, true if anything went wrong
		data: if there was an error, JSON like {title:["TO BE DONE"]}
				if everything went fine, a JSON representing the directory
	}
 */
const firestoreGetDirById = async function (sandboxId, shortId) {
	//console.log(`Reading directory ${shortId} from ${sandboxId}....`)

	let data = {title:["TO BE DONE"]}

	try{
		let doc = await firestore.collection('sandboxes').doc(sandboxId).get()
		if(doc.exists){
			data = doc.data().directories[shortId]
			//console.log(`Found and read directory ${shortId} from ${sandboxId}`)
		} else {
			console.log(`Couldn't find directory ${shortId} in sandbox ${sandboxId}`)
			return {error:true, data}
		}
	} catch(err){
		console.log(`Couldn't find directory ${shortId} in sandbox ${sandboxId}`)
		console.log(err)
		return {error:true, data};
	}

	return {error:false, data}
}

/**
 * firestoreGetModuleById - get the data representation of a module in a sandbox
 *
 * @param  {string} sandboxId id of the sandbox to be read
 * @param  {string} moduleId  id of the module to be read
 * @return {json}
	 {
		 error: true if succeeded, false if anything went wrong
		 data: if there was an error, JSON like {title:["TO BE DONE"]}
				 if everything went fine, the contents of the module document (a JSON)
	 }
 */

const firestoreGetModuleById = async function (sandboxId, moduleId) {
	//console.log(`Reading module ${moduleId} from ${sandboxId}....`)

	let data = {title:["TO BE DONE"]}
	try{
		let doc = await firestore.collection('sandboxes').doc(sandboxId).collection('modules').doc(moduleId).get()
		if(doc.exists){
			data = doc.data()
			if(data.code == "")
				data.code = null
			//console.log(`Found and read module ${moduleId} from ${sandboxId}`)
		} else {
			console.log(`Couldn't find module ${moduleId} in sandbox ${sandboxId}`)
			return {error:true, data}
		}
	} catch(err){
		console.log(`Couldn't find module ${moduleId} in sandbox ${sandboxId}`)
		console.log(err)
		return {error:true, data};
	}

	return {error:false, data}
}
module.exports = {
    firestoreGetDirById,
    firestoreGetModuleById,
    firestoreGetSandboxById,
}