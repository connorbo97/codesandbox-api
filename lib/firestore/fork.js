const firestore = require('./firestore')
const {firestoreGetSandboxById} = require ('./get')
const omit = require('@f/omit')

/**
 * firestoreForkSandbox - makes a copy of originalId at newId
 * 
 * @param {string} originalId 	- id of the original sandbox document
 * @param {string} newId 		- id for the forked sandbox
 * @returns {json}
	{
		error: false if succeeded, true if anything went wrong
		data: if there was an error, JSON like {title:["TO BE DONE"]}
				if everything went fine, a JSON of the contents of the new document
	}
 */
const firestoreForkSandbox = async function (originalId, newId) {
	//console.log(`Forking sandbox ${originalId} to ${newId}....`)

	let result = await firestoreGetSandboxById(originalId)
	// console.log(result)
	let {error, data} = result
	if(error){
		return {error:true, data:{title:["TO BE DONE"]}}
	}
	let forkedData = data
	let {modules, directories} = data
	let curDate = new Date()

	data.owned = true
	data.id = newId
	data.source_id = newId
	data.update_at = curDate.toISOString()
	//forkedData.author = user id once i figure that out

	try{
		let tasks = [firestore.collection('sandboxes').doc(newId).set(omit(["modules", "directories"], data))]

		let tempDir = {}

		//data.directories is an array received from firestoreGetSandboxById
			//it has a json for each directory
		data.directories.forEach((dir, index) => {
			data.directories[index].source_id = newId 	//update the data to be returned to have the right source_id
			dir.source_id = newId						//update the copy of the directory with the new source_id
			tempDir[dir.id] = dir						//add this directory to the json that will be set in firebase
		})

		tasks.push(firestore.collection('sandboxes').doc(newId).update({directories:tempDir}))
		data.modules.forEach((mod, index) => {
			data.modules[index].source_id = newId
			mod.source_id = newId
			tasks.push(firestore.collection('sandboxes').doc(newId).collection('modules').doc(mod.id).set(mod))
		})

		await Promise.all(tasks)

	} catch(err){
		console.log(`Failed to fork sandbox ${originalId} to ${newId}`)
		console.log(err)
		return {error:true, data:{title:["TO BE DONE"]}}
	}
	//console.log(`Forked sandbox ${originalId} to ${newId}....`)

	return {data:data}
}
module.exports = {
    firestoreForkSandbox,
}