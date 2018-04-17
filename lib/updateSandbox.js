/**
 * Imports
 */

const uuid = require('uuid')
const {mkdirs} = require('fs-extra')
const {join} = require('path')
const prosh = require('prosh')
const shortid = require('shortid')
const co = require('co')
const {firestoreUpdateSandboxById, firestoreGetSandboxById} = require('./firestore')

const updateModules = async function (sandboxID, body) {
	if(!sandboxID){
		console.log("Invalid sandboxID: " + sandboxID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID]}}
	} else if(!body || !body.sandbox){
		console.log("No body or no sandbox")
		console.log(body)
		return {error:true, data:{title:["No body or no sandbox"]}}
	}
	// console.log("A")
	// console.log(body)
	// console.log(body.module)
	// let moduleInfo = JSON.parse(body.module)
	let sandboxInfo = body.sandbox
	// console.log("B")
	// database.ref(`sandboxes/${sourceID}/directories`).push(moduleInfo)
	let {error, data} = firestoreUpdateSandboxById(sandboxID, sandboxInfo)

	if(error)
		return {error:true, data:{title:["Failed to update module"]}}

	return {error, data}
  
}

module.exports = updateModules
