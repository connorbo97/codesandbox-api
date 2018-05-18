const firestore = require('./firestore')
const omit = require('@f/omit')
const {vanilla_template, create_react_app_template, vue_template, angular_template, preact_template, svelte_template} = require('./templates.js')

/**
 * FOR CREATING THE DEFAULT SANDBOXES (not called by CodeSandbox)
 * firestoreCreateSandbox - creates a new sandbox document
 * 
 * @param {string} template -which template to use to create the sandbox
 * @returns {json}
 * 		{} if an error occured
 * 		sandbox data json otherwise
 */
const firestoreCreateSandbox = (template) => {
	let newSandbox = {modules:[], directories:[]}
	if(template == "vanilla"){
		newSandbox = vanilla_template()
	}
	else if(template == "vue"){
		newSandbox = vue_template()
	}
	else if(template == "angular"){
		newSandbox = angular_template()
	}
	else if(template == "preact"){
		newSandbox = preact_template()
	}
	else if(template == "svelte"){
		newSandbox = svelte_template()
	}

	try{
		let {modules, directories, id} = newSandbox
		firestore.collection('sandboxes').doc(id).set(omit(["modules", "directories"], newSandbox))

		let moduleCollec = firestore.collection('sandboxes').doc(id).collection('modules')

		modules.forEach((mod) =>{
			moduleCollec.doc(mod.id).set(mod)
		})

		let tempDir = {}
		directories.forEach((directory) => {
			tempDir[directory.id] = directory
		})

		firestore.collection('sandboxes').doc(id).update({directories:tempDir})

	} catch(err){
		console.log(`Failed to add directory:`)
		console.log(err)
		return {};
	}
	return newSandbox;

}

/**
 * firestoreCreateDir - creates a new directory for the sandbox
 * 
 * @param {string} sandboxId 	- id of the sandbox document
 * @param {json} data 		- JSON representing the new directory
 * @returns {bool}
 * 	true if succeeded in adding directory, false otherwise
 */
const firestoreCreateDir = (sandboxId, data) => {
	//console.log(`Creating directory ${data.shortid} for ${sandboxId}....`)
	let sandboxDoc
	try{
		sandboxDoc = firestore.collection('sandboxes').doc(sandboxId)

		let curDate = new Date()

		sandboxDoc.update({update_at: curDate.toISOString(), [`directories.${data.id}`]: data})
	} catch(err){
		console.log(`Failed to add directory ${data.shortid} for ${sandboxId}`)
		console.log(err)
		return false;
	}

	//console.log(`Added directory ${data.shortid} for ${sandboxId}`)
	return true;

}

/**
 * firestoreCreateModule - creates a new module for the sandbox
 * 
 * @param {any} sandboxId 	- id of the sandbox document
 * @param {any} data 		- JSON representing the module
 * @returns {bool}
 *	true if succeeded in adding module, false otherwise
 */
const firestoreCreateModule = (sandboxId, data) => {
	//console.log(`Creating module ${data.shortid} for ${sandboxId}....`)
	let sandboxDoc
	try{
		let curDate = new Date()
		firestore.collection('sandboxes').doc(sandboxId).update({update_at:curDate.toISOString()})
		sandboxDoc = firestore.collection('sandboxes').doc(sandboxId).collection('modules').doc(data.id)

		sandboxDoc.set(data)
	} catch(err){
		console.log(`Failed to add module ${data.shortid} for ${sandboxId}`)
		console.log(err)
		return false;
	}
	//console.log(`Added module ${data.shortid} for ${sandboxId}`)

	return true;

}

module.exports = {
    firestoreCreateDir,
    firestoreCreateModule,
    firestoreCreateSandbox,
}