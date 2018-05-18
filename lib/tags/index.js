/**
 * Imports
 */
const {firestoreAddTag} = require('../firestore')

const tags = async function (sandboxID, body) {

	if(!sandboxID){
		//console.log("Invalid sandboxID: " + sandboxID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID]}}
	} else if(!body || !body.tag){
		//console.log("No body or no tag")
		//console.log(body)
		return {error:true, data:{title:["No body or no tag"]}}
	}

	// database.ref(`sandboxes/${sourceID}/directories`).push(dirInfo)
	let result = await firestoreAddTag(sandboxID, body.tag)

	return result
}

module.exports = tags
