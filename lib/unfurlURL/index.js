/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreGetSandboxById} = require('../firestore')

const unfurlURL = async function (body) {
	//console.log("Unfurl URL..")
	if(!body || !body.taskUrl){
		//console.log("No body or no taskUrl")
		//console.log(body)
		return {error:true, data:"No taskUrl provided"}
	}

	let sandboxID = ""
	let data = {}
	try{
		let index = body.taskUrl.lastIndexOf('/') + 1
		//0 bc index is the last index of / + 1, ie if there is none it would be -1 + 1
		if(index == 0){
			return {error:true, data:"Bad url given (no / found): " + body.taskUrl}
		}
		sandboxID = body.taskUrl.substr(index)
		let result = await firestoreGetSandboxById(sandboxID)
		data = result.data
		if(result.error){
			return {error:true, data:"Couldn't find sandbox " + sandboxID}
		}
	}catch(err){
		//console.log("Couldn't find last segment of taskUrl: " + body.taskUrl)
		//console.log(err)
		return {error:true, data:"Couldn't get sandboxID from url"}
	}


	// res.imageUrl = "" //should be link to codesandbox logo probably
	let res = {
		displayName: data.title || sandboxID,
		url: body.taskUrl,
		type: "assignment",
	}

	//console.log("Unfurled URL")

	return {error:false, data:res}
}

module.exports = unfurlURL