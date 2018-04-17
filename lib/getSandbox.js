/**
 * Imports
 */

const uuid = require('uuid')
const {mkdirs} = require('fs-extra')
const {join} = require('path')
const prosh = require('prosh')
const shortid = require('shortid')
const co = require('co')
const {firestore, firestoreUpdateSandboxById, firestoreGetSandboxById} = require('./firestore')

const getSandbox = async function (sandboxID) {
	let error = false
	if(!sandboxID){
		console.log("Invalid sandboxID: " + sandboxID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID]}}
	}

	// let sandboxInfo = JSON.parse(body.sandbox)

	// if(!sandboxInfo.title && !sandboxInfo.description){
	// 	console.log("No title or description provided")
	// 	return {error:true, output:"No title or description provided"}
	// }

	// let success = firestoreUpdateSandboxById(sandboxID, sandboxInfo)

	// if(!success)
	// 	return {error:true, data:{title:["Failed to update sandbox"]}}

	return firestoreGetSandboxById(sandboxID)
  
}

module.exports = getSandbox
