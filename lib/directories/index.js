/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreCreateDir, firestoreGetDirById} = require('../firestore')

const directories = async function (sandboxID, body) {
	let error = false

	if(!sandboxID){
		//console.log("Invalid sandboxID: " + sandboxID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID]}}
	} else if(!body || !body.directory){
		//console.log("No body or no directory")
		//console.log(body)
		return {error:true, data:{title:["No body or no directory"]}}
	}

	let dirInfo = body.directory

	if(!dirInfo.title){
		//console.log("No Title")
		return {error:true, data:{title:["No title"]}}

	}

	//create a new id for the directory
	//using the same id as shortid
	let newId = shortid.generate()
	dirInfo.shortid = newId
	dirInfo.id = newId

	dirInfo.source_id = sandboxID

	let success = await firestoreCreateDir(sandboxID, dirInfo)

	if(!success)
		return {error:true, data:{title:["Failed to create dir"]}}

	return await firestoreGetDirById(sandboxID, newId)
}

module.exports = directories
