/**
 * Imports
 */

const uuid = require('uuid')
const {mkdirs} = require('fs-extra')
const {join} = require('path')
const prosh = require('prosh')
const shortid = require('shortid')
const co = require('co')
const {firestore, firestoreUpdateModuleById, firestoreGetModuleById} = require('./firestore')

const updateModules = async function (sandboxID, moduleID, body) {
	let error = false
	if(!sandboxID || !moduleID){
		console.log("Invalid sandboxID: " + sandboxID + " or moduleID: " + moduleID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID + " or moduleID: " + moduleID]}}
	} else if(!body || !body.module){
		console.log("No body or no module")
		console.log(body)
		return {error:true, data:{title:["No body or no module"]}}
	}
	// console.log("A")
	// console.log(body)
	// console.log(body.module)
	// let moduleInfo = JSON.parse(body.module)
	let moduleInfo = body.module
	// console.log("B")
	if(!moduleInfo.code){
		console.log("No code")
		return {error:true, data:{title:["No code provided"]}}
	}

	// database.ref(`sandboxes/${sourceID}/directories`).push(moduleInfo)
	let success = firestoreUpdateModuleById(sandboxID, moduleID, moduleInfo)

	if(!success)
		return {error:true, data:{title:["Failed to update module"]}}

	return firestoreGetModuleById(sandboxID, moduleID)
  
}

module.exports = updateModules
