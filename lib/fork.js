/**
 * Imports
 */

const uuid = require('uuid')
const {mkdirs} = require('fs-extra')
const {join} = require('path')
const prosh = require('prosh')
const shortid = require('shortid')
const co = require('co')
const {firestoreForkSandbox} = require('./firestore')

const fork = async function (sandboxID) {
	let error = false
	if(!sandboxID){
		console.log("Invalid sandboxID: " + sandboxID)
		return {error:true, data:{title:["Invalid sandboxID: " + sandboxID]}}
	}

	let result = await firestoreForkSandbox(sandboxID, shortid.generate())

	return result
}

module.exports = fork