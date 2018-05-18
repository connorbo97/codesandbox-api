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
		firestore.collection('sandboxes').doc(newId).set(omit(["modules", "directories"], data))
		let modCollection = firestore.collection('sandboxes').doc(newId).collection('modules')
		let directoryDoc = firestore.collection('sandboxes').doc(newId)
		let tempDir = {}
		data.directories.forEach((dir, index) => {
			data.directories[index].source_id = newId
			dir.source_id = newId
			tempDir[dir.id] = dir
		})
		directoryDoc.update({directories:tempDir})
		data.modules.forEach((mod, index) => {
			data.modules[index].source_id = newId
			mod.source_id = newId
			modCollection.doc(mod.id).set(mod)
		})

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