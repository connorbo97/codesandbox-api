/**
 * Imports
 */

const uuid = require('uuid')
const {mkdirs} = require('fs-extra')
const shortid = require('shortid')
const {join} = require('path')
const prosh = require('prosh')
const co = require('co')
const {firestore, firestoreCreateSandbox, firestoreGetSandbox} = require('./firestore')

const createSandbox = async function () {
	let args = {}
	args["id"] = shortid.generate()
	args["template"] = "create-react-app"
	console.log(args)
	return firestoreCreateSandbox(args)


}

module.exports = createSandbox
