/**
 * Imports
 */
const {firestoreDeleteTag} = require('./firestore')

const deleteTag = async function (sandboxID, tag) {

	if(!sandboxID || !tag){
		console.log("Invalid sandboxID: " + sandboxID + " or tag " + tag)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID + " or tag " + tag]}}
	} 

	// database.ref(`sandboxes/${sourceID}/directories`).push(dirInfo)
	let result = await firestoreDeleteTag(sandboxID, tag)

	return result
}

module.exports = deleteTag
