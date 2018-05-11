/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreGetSandboxById} = require('../firestore')

const forkURL = async function (body) {
	console.log("Unfurl URL..")
	if(!body || !body.taskUrl){
		console.log("No body or no taskUrl")
		console.log(body)
		return {error:true, data:"No taskUrl provided"}
	}

	let sandboxID = ""
	let index = -1
	try{
		index = body.taskUrl.lastIndexOf('/') + 1
		sandboxID = body.taskUrl.substr(index)
	}catch(err){
		console.log("Couldn't find last segment of taskUrl: " + body.taskUrl)
		console.log(err)
		return {error:true, data:"Couldn't get sandboxID from url"}
	}

	// let error = true
	let {error, data} = await firestoreGetSandboxById(sandboxID)

	if(error)
		return {error:true, data:"Couldn't find sandbox " + sandboxID}
	
	console.log("Unfurled URL")

	let res = {}
	res.displayName = data.title || sandboxID
	res.url = body.taskUrl
	// res.imageUrl = "" //should be link to codesandbox logo probably
	res.type = "assignment"

	return {error:false, data:res}
}

module.exports = forkURL