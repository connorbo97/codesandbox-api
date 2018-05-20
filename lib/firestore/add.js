const firestore = require('./firestore')
const {firestoreGetSandboxById} = require('./get')

/**
 * firestoreAddTag - adds a tag to a sandbox
 * 
 * @param {string} sandboxId 	- id of the sandbox document
 * @param {string} tag 		 	- the tag to be added
 * @returns {json}
 * 	{
		error: true if an error occured, false if everything went fine
		data: if there's an error, its a JSON of {title:["ERROR DESCRIPTION"]}
				if everything went fine, it's an array of all the tags for the sandbox
	}
 */
const firestoreAddTag = async function(sandboxId, tag){
	//console.log(`Adding tag ${tag} to ${sandboxId}....`)

	try{
		let {error, data} = await firestoreGetSandboxById(sandboxId)
		if(error){
			//console.log("failed to get sandbox")
			return {error, data}
		}
		let curDate = new Date()
		let obj = {
			update_at: curDate.toISOString(),
			tags: (data.tags || []).concat(tag)
		}

		firestore.collection('sandboxes').doc(sandboxId).update(obj)

		//console.log(`Found and updated sandbox ${sandboxId}`)
		return {error:false, data:obj.tags}
	} catch(err){
		console.log(`Couldn't find and update tags for sandbox ${sandboxId}`)
		console.log(err)
		return {error:true, data:{title:["TO BE DONE"]}}
	}
}

/**
 * firestoreAddResource - adds a resource to a sandbox
 * 
 * @param {string} sandboxId 	-id of the sandbox document
 * @param {string} resource 	-the resource to be added
 * @returns {json}
	{
		error: true if an error occured, false if everything went fine
		data: if there's an error, its a JSON of {title:["ERROR DESCRIPTION"]}
				if everything went fine, it's an array of all the resources for the sandbox
	}
 */
const firestoreAddResource = async function(sandboxId, resource){
	//console.log(`Adding resource ${resource} to ${sandboxId}....`)

	try{
		let {error, data} = await firestoreGetSandboxById(sandboxId)
		if(error){
			//console.log("failed to get sandbox")
			return {error, data}
		}

		let curDate = new Date()
		let obj = {
			update_at: curDate.toISOString(),
			external_resources: data.external_resources(data.external_resources || []).concat(resource)
		}

		firestore.collection('sandboxes').doc(sandboxId).update(obj)

		//console.log(`Found and updated sandbox ${sandboxId}`)
		return {error:false, data:obj.external_resources}
	} catch(err){
		console.log(`Couldn't find and update resources for sandbox ${sandboxId}`)
		console.log(err)
		return {error:true, data:{title:["TO BE DONE"]}}
	}
}

module.exports = {
    firestoreAddResource,
    firestoreAddTag,
}