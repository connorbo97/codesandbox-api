const firestore = require('./firestore')
const shortid = require('shortid')
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
const firestoreCreateSandbox = async function(template){
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
	} else {
		newSandbox = create_react_app_template(shortid.generate(), shortid.generate(), [shortid.generate(), shortid.generate(), shortid.generate(), shortid.generate()])
	}

	try{
		let {modules, directories, id} = newSandbox
		firestore.collection('sandboxes').doc(id).set(omit(["modules", "directories"], newSandbox))

		let moduleCollec = firestore.collection('sandboxes').doc(id).collection('modules')

		let tasks = []
		modules.forEach((mod) =>{
			tasks.push(moduleCollec.doc(mod.id).set(mod))
		})
		
		let tempDir = {}
		directories.forEach((directory) => {
			tempDir[directory.id] = directory
		})

		//perform all module sets and the directory in parallel
		await Promise.all(tasks.concat(firestore.collection('sandboxes').doc(id).update({directories:tempDir})))
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
const firestoreCreateDir = async function(sandboxId, data){
	//console.log(`Creating directory ${data.shortid} for ${sandboxId}....`)
	try{
		let curDate = new Date()
		await firestore.collection('sandboxes').doc(sandboxId).update({
			update_at: curDate.toISOString(),
			[`directories.${data.id}`]: data
		})
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
const firestoreCreateModule = async function(sandboxId, data){
	//console.log(`Creating module ${data.shortid} for ${sandboxId}....`)
	try{
		let curDate = new Date()
		
		//perform sandbox doc update and module update at the same time
		await Promise.all([
			firestore.collection('sandboxes').doc(sandboxId).update({
				update_at:curDate.toISOString()
			}),
			firestore.collection('sandboxes').doc(sandboxId).collection('modules').doc(data.id).set(data)
		])

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