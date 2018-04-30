const firebase = require('firebase')
const uuid = require('uuid')
const shortid = require('shortid')
const omit = require('@f/omit')
const {vanilla_template, create_react_app_template, vue_template, angular_template, preact_template, svelte_template} = require('./templates.js')
require('firebase/firestore')

const config = {
	apiKey: "AIzaSyDi0sW0GjK-PJfLDOXa-ZiPREIQqgHAjag",
	authDomain: "codesandbox-f9b31.firebaseapp.com",
	databaseURL: "https://codesandbox-f9b31.firebaseio.com",
	projectId: "codesandbox-f9b31",
	storageBucket: "",
	messagingSenderId: "576558851444"
};

const default_template = {
	template: "default",
	"npm_dependencies": {},
	modules: [
		{
            "title":"index.js",
            "source_id":"b4e41805-6991-46a3-ac1e-4891725f4aa5",
            "shortid":"5EBWX",
            "is_binary":false,
            "directory_shortid":"yy2qw",
            "code":null
        },
    ],
	entry: "index.js",
	directories: [],
}

/*used to create a react sandbox
*/


const firestore = firebase.initializeApp(config).firestore()

/*
	firestoreAddTag
	Function:
		adds a tag to a sandbox
	Params:
		sandboxId: id of the sandbox document
		tag: the tag to be added

	Return:
		JSON like the following
		{
			error: true if an error occured, false if everything went fine
			data: if there's an error, its a JSON of {title:["ERROR DESCRIPTION"]}
				  if everything went fine, it's an array of all the tags for the sandbox
		}
*/
const firestoreAddTag = async function(sandboxId, tag){
	console.log(`Adding tag ${tag} to ${sandboxId}....`)

	try{
		let {error, data} = await firestoreGetSandboxById(sandboxId)
		if(error){
			console.log("failed to get sandbox")
			return {error, data}
		}
		if(!data.tags)
			data.tags = [tag]
		else
			data.tags.push(tag)
		let curDate = new Date()
		let obj = {
			update_at: curDate.toISOString(),
			tags: data.tags
		}
		firestore.collection('sandboxes').doc(sandboxId).update(obj)
		console.log(`Found and updated sandbox ${sandboxId}`)
		return {error:false, data:data.tags}
	} catch(err){
		console.log(`Couldn't find and update tags for sandbox ${sandboxId}`)
		console.log(err)
		return {error:true, data:{title:["TO BE DONE"]}}
	}
}

/*
	firestoreAddResource
	Function:
		adds a resource to a sandbox
	Params:
		sandboxId: id of the sandbox document
		resource: the resource to be added

	Return:
		JSON like the following
		{
			error: true if an error occured, false if everything went fine
			data: if there's an error, its a JSON of {title:["ERROR DESCRIPTION"]}
				  if everything went fine, it's an array of all the resources for the sandbox
		}
*/
const firestoreAddResource = async function(sandboxId, resource){
	console.log(`Adding resource ${resource} to ${sandboxId}....`)

	try{
		let {error, data} = await firestoreGetSandboxById(sandboxId)
		if(error){
			console.log("failed to get sandbox")
			return {error, data}
		}
		if(!data.external_resources)
			data.external_resources = [resource]
		else
			data.external_resources.push(resource)
		let curDate = new Date()
		let obj = {
			update_at: curDate.toISOString(),
			external_resources: data.external_resources
		}
		firestore.collection('sandboxes').doc(sandboxId).update(obj)
		console.log(`Found and updated sandbox ${sandboxId}`)
		return {error:false, data:data.external_resources}
	} catch(err){
		console.log(`Couldn't find and update resources for sandbox ${sandboxId}`)
		console.log(err)
		return {error:true, data:{title:["TO BE DONE"]}}
	}
}


/*
	firestoreCreateSandbox
	DEPRECATED: SHOULDN'T MAKE A SANDBOX EVER
	Function:
		creates a new sandbox document
	Params:
		args: JSON containing any parameters to be set for the sandbox; all attributes not included will be set to default values

	Return:
		JSON like the following
		{
			error: true if an error occured, false if everything went fine
			data: if there's an error, its a JSON of {title:["ERROR DESCRIPTION"]}
				  if everything went fine, it's an array of all the resources for the sandbox
		}
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
		// let {modules, directories} = args
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
// const firestoreCreateSandbox = (args) => {
// 	console.log(`Creating new sandbox....`)

// 	let {id, template} = args
// 	id = "vue"
// 	let curDate = new Date()

// 	args.description = args.description || null
// 	args.view_count = args.view_count || 0
// 	args.user_liked = args.user_liked || false
// 	args.update_at = args.update_at || curDate.toISOString()
// 	args.tags = args.tags || []
// 	args.source_id = args.id
// 	args.privacy = args.privacy || 0
// 	args.owned = args.owned || false
// 	args.original_git_commit_sha = args.original_git_commit_sha || null
// 	args.like_count = args.like_count || 0
// 	args.git = args.git || null
// 	args.forked_from_sandbox = null
// 	args.author = null
// 	args.id = "vue"
// 	// args.forked_from_sandbox = args.forked_from_sandbox || {												//TODO: figure out forked data
//  //         "view_count":1,
//  //         "updated_at":"2018-03-05T21:17:49.262461",
//  //         "title":null,
//  //         "template":"create-react-app",
//  //         "privacy":0,
//  //         "like_count":0,
//  //         "inserted_at":"2018-03-05T21:17:49.262445",
//  //         "id":"jjkp6r6479",
//  //         "git":null,
//  //         "fork_count":1
//  //    }
// 	args.fork_count = args.fork_count || 0
// 	args.external_resources = args.external_resources || []
// 	args.title = args.title || null
// 	args.version = args.version || 0

// 	if(!template || template == "create-react-app"){
// 		let temp = create_react_app_template(id, shortid.generate(), shortid.generate(), [shortid.generate(), shortid.generate(), shortid.generate(), shortid.generate()])
// 		for(var item in temp)
// 			args[item] = temp[item]
// 	}
// 	//need to add the other templates

// 	try{
// 		// let {modules, directories} = args
// 		let {modules, directories} = vue_template()
// 		delete args.modules
// 		delete args.directories
// 		firestore.collection('sandboxes').doc(id).set(args)

// 		let moduleCollec = firestore.collection('sandboxes').doc(id).collection('modules')

// 		modules.forEach((mod) =>{
// 			moduleCollec.doc(mod.id).set(mod)
// 		})

// 		let tempDir = {}
// 		directories.forEach((directory) => {
// 			tempDir[directory.id] = directory
// 		})

// 		firestore.collection('sandboxes').doc(id).update({directories:tempDir})
// 		args.modules = modules
// 		args.directories = directories

// 	} catch(err){
// 		console.log(`Failed to add directory:`)
// 		console.log(err)
// 		return {};
// 	}

// 	return args;

// }

/*
	firestoreCreateDir
	Function:
		creates a new directory for the sandbox
	Params:
		sandboxId: id of the sandbox document
		data: JSON representing the directory
	Return:
		true if succeeded in adding directory, false otherwise
*/
const firestoreCreateDir = (sandboxId, data) => {
	console.log(`Creating directory ${data.shortid} for ${sandboxId}....`)
	let sandboxDoc
	try{
		sandboxDoc = firestore.collection('sandboxes').doc(sandboxId)

		let newEntry = {}
		let curDate = new Date()
		newEntry.update_at = curDate.toISOString()

		newEntry[`directories.${data.id}`] = data
		sandboxDoc.update(newEntry)
	} catch(err){
		console.log(`Failed to add directory ${data.shortid} for ${sandboxId}`)
		console.log(err)
		return false;
	}

	console.log(`Added directory ${data.shortid} for ${sandboxId}`)
	return true;

}


/*
	firestoreCreateModule
	Function:
		creates a new module for the sandbox
	Params:
		sandboxId: id of the sandbox document
		data: JSON representing the module
	Return:
		true if succeeded in adding module, false otherwise
*/
const firestoreCreateModule = (sandboxId, data) => {
	console.log(`Creating module ${data.shortid} for ${sandboxId}....`)
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
	console.log(`Added module ${data.shortid} for ${sandboxId}`)

	return true;

}

/*
	firestoreDeleteSandboxById
	Function:
		deletes sandbox from firestore
	Params:
		sandboxId: id of the sandbox document to be deleted
	Return:
		true if succeeded in deleting sandbox, false otherwise
*/
const firestoreDeleteSandboxById = (sandboxId) => {
	console.log(`Deleting sandbox ${sandboxId}....`)
	try{
		firestore.collection('sandboxes').doc(sandboxId).delete()
	} catch(err){
		console.log(`Failed to delete ${sandboxId}`)
		console.log(err)
		return false;
	}
	console.log(`Deleted sandbox ${sandboxId}`)

	return true;

}

/*
	firestoreDeleteTag
	Function:
		deletes tag from a sandbox
		currently deletes all matching tags (CodeSandbox shouldn't allow you to add duplicates though)
	Params:
		sandboxId: id of the sandbox document
		tag: name of tag to be deleted
	Return:
		JSON like the following:
		{
			error: true if succeeded, false if anything went wrong
			data: if there was an error, JSON like {title:["TO BE DONE"]}
				  if everything went fine, an array of all the remaining tags of the sandbox
		}
*/
const firestoreDeleteTag = async function(sandboxId, tag){
	console.log(`Deleting tag ${tag} from ${sandboxId}....`)

	try{
		let {error, data} = await firestoreGetSandboxById(sandboxId)
		if(error){
			console.log("failed to get sandbox")
			return {error, data}
		}

		if(!data.tags){
			console.log("no tags found for sandbox " + sandboxId)
			return {error, data:{title:["TO BE DONE"]}}
		}
		let newTags = data.tags.filter(existingTag=>existingTag != tag)
		let curDate = new Date()
		let obj = {
			update_at: curDate.toISOString(),
			tags: newTags
		}
		firestore.collection('sandboxes').doc(sandboxId).update(obj)
		console.log(`Found and updated sandbox ${sandboxId}`)
		return {error:false, data:newTags}
	} catch(err){
		console.log(`Couldn't find and update tags for sandbox ${sandboxId}`)
		console.log(err)
		return {error:true, data:{title:["TO BE DONE"]}}
	}
}

/*
	firestoreDeleteResource
	Function:
		deletes resource from a sandbox
		currently deletes all matching resources (CodeSandbox shouldn't allow you to add duplicates though)
	Params:
		sandboxId: id of the sandbox document
		resource: name of resource to be deleted
	Return:
		JSON like the following:
		{
			error: true if succeeded, false if anything went wrong
			data: if there was an error, JSON like {title:["TO BE DONE"]}
				  if everything went fine, an array of all the remaining resources of the sandbox
		}
*/
const firestoreDeleteResource = async function(sandboxId, resource){
	console.log(`Deleting resource ${resource} from ${sandboxId}....`)

	try{
		let {error, data} = await firestoreGetSandboxById(sandboxId)
		if(error){
			console.log("failed to get sandbox")
			return {error, data}
		}

		if(!data.external_resources){
			console.log("no resources found for sandbox " + sandboxId)
			return {error, data:{title:["TO BE DONE"]}}
		}
		let newResources = data.external_resources.filter(res=>res != resource)
		let curDate = new Date()
		let obj = {
			update_at: curDate.toISOString(),
			external_resources: newResources
		}
		firestore.collection('sandboxes').doc(sandboxId).update(obj)
		console.log(`Found and updated sandbox ${sandboxId}`)
		return {error:false, data:newResources}
	} catch(err){
		console.log(`Couldn't find and update resources for sandbox ${sandboxId}`)
		console.log(err)
		return {error:true, data:{title:["TO BE DONE"]}}
	}
}

/*
	firestoreForkSandbox
	Function:
		takes one project and makes a copy of it with a new id
	Params:
		originalId: id of the original sandbox document
		newId: id for the forked sandbox
	Return:
		JSON like the following:
		{
			error: true if succeeded, false if anything went wrong
			data: if there was an error, JSON like {title:["TO BE DONE"]}
				  if everything went fine, a JSON of the contents of the new document
		}
*/
const firestoreForkSandbox = async function (originalId, newId) {
	console.log(`Forking sandbox ${originalId} to ${newId}....`)

	let result = await firestoreGetSandboxById(originalId)
	// console.log(result)
	let {error, data} = result
	if(error){
		return {error:true, data:{title:["TO BE DONE"]}}
	}
	let forkedData = data
	let {modules, directories} = data
	let curDate = new Date()

	data.owned = true
	data.id = newId
	data.source_id = newId
	data.update_at = curDate.toISOString()
	//forkedData.author = user id once i figure that out

	try{
		firestore.collection('sandboxes').doc(newId).set(omit(["modules", "directories"], data))
		let modCollection = firestore.collection('sandboxes').doc(newId).collection('modules')
		let directoryDoc = firestore.collection('sandboxes').doc(newId)
		let tempDir = {}
		data.directories.forEach((dir, index) => {
			data.directories[index].source_id = newId
			dir.source_id = newId
			tempDir[dir.id] = dir
		})
		directoryDoc.update({directories:tempDir})
		data.modules.forEach((mod, index) => {
			data.modules[index].source_id = newId
			mod.source_id = newId
			modCollection.doc(mod.id).set(mod)
		})
			
	} catch(err){
		console.log(`Failed to fork sandbox ${originalId} to ${newId}`)
		console.log(err)
		return {error:true, data:{title:["TO BE DONE"]}}
	}
	console.log(`Forked sandbox ${originalId} to ${newId}....`)

	return {data:data}
}

/*
	firestoreGetSandboxById
	Function:
		get the data representation of a sandbox
	Params:
		sandboxId: id of the sandbox to be read
	Return:
		JSON like the following:
		{
			error: true if succeeded, false if anything went wrong
			data: if there was an error, JSON like {title:["TO BE DONE"]}
				  if everything went fine, a JSON representing the data of the sandbox
		}
*/
const firestoreGetSandboxById = async function (sandboxId) {
	console.log(`Reading sandbox ${sandboxId}....`)

	let data = {title:["TO BE DONE"]}

	try{
		let doc = await firestore.collection('sandboxes').doc(sandboxId).get()
		if(doc.exists){
			data = doc.data()
			console.log(`Found and read sandbox ${sandboxId}`)
		} else {
			console.log(`Couldn't find sandbox ${sandboxId}`)
			return {error:true, data}
		}

		let dirArr = []

		for(var id in data.directories)
			dirArr.push(data.directories[id])
		
		data.directories = dirArr
		let collect = await firestore.collection('sandboxes').doc(sandboxId).collection('modules').get()

		let modules = []
		if(collect.docs.length > 0){
			collect.forEach((snap)=>{
				modules.push(snap.data())
			})
		}

		data["modules"] = modules

	} catch(err){
		console.log(`Couldn't get sandbox ${sandboxId}`)
		console.log(err)
		return {error:true, data};
	}

	return {error:false, data}
}

/*
	firestoreGetDirById
	Function:
		get the data representation of a directory in a sandbox
	Params:
		sandboxId: id of the sandbox to be read
		shortId: id of the directory to be read
	Return:
		JSON like the following:
		{
			error: true if succeeded, false if anything went wrong
			data: if there was an error, JSON like {title:["TO BE DONE"]}
				  if everything went fine, a JSON representing the directory
		}
*/
const firestoreGetDirById = async function (sandboxId, shortId) {
	console.log(`Reading directory ${shortId} from ${sandboxId}....`)

	let data = {title:["TO BE DONE"]}

	try{
		let doc = await firestore.collection('sandboxes').doc(sandboxId).get()
		if(doc.exists){
			data = doc.data().directories[shortId]
			console.log(`Found and read directory ${shortId} from ${sandboxId}`)
		} else {
			console.log(`Couldn't find directory ${shortId} in sandbox ${sandboxId}`)
			return {error:true, data}
		}
	} catch(err){
		console.log(`Couldn't find directory ${shortId} in sandbox ${sandboxId}`)
		console.log(err)
		return {error:true, data};
	}

	return {error:false, data}
}

/*
	firestoreGetModuleById
	Function:
		get the data representation of a module in a sandbox
	Params:
		sandboxId: id of the sandbox to be read
		moduleId: id of the module to be read
	Return:
		JSON like the following:
		{
			error: true if succeeded, false if anything went wrong
			data: if there was an error, JSON like {title:["TO BE DONE"]}
				  if everything went fine, the contents of the module document (a JSON)
		}
*/
const firestoreGetModuleById = async function (sandboxId, moduleId) {
	console.log(`Reading module ${moduleId} from ${sandboxId}....`)

	let data = {title:["TO BE DONE"]}
	try{
		let doc = await firestore.collection('sandboxes').doc(sandboxId).collection('modules').doc(moduleId).get()
		if(doc.exists){
			data = doc.data()
			if(data.code == "")
				data.code = null
			console.log(`Found and read module ${moduleId} from ${sandboxId}`)
		} else {
			console.log(`Couldn't find module ${moduleId} in sandbox ${sandboxId}`)
			return {error:true, data}
		}
	} catch(err){
		console.log(`Couldn't find module ${moduleId} in sandbox ${sandboxId}`)
		console.log(err)
		return {error:true, data};
	}

	return {error:false, data}
}

/*
	firestoreUpdateSandboxById
	Function:
		update the data of a sandbox
	Params:
		sandboxId: id of the sandbox to be read
		sandboxInfo: JSON to be merged with the sandbox document
	Return:
		true if succeeded, false if anything went wrong
*/
const firestoreUpdateSandboxById = (sandboxId, sandboxInfo) => {
	console.log(`Updating sandbox ${sandboxId}....`)

	try{
		let curDate = new Date()
		sandboxInfo.update_at = curDate.toISOString()
		firestore.collection('sandboxes').doc(sandboxId).update(sandboxInfo)
		console.log(`Found and updated sandbox ${sandboxId}`)
	} catch(err){
		console.log(`Couldn't find sandbox ${sandboxId}`)
		console.log(err)
		return false
	}

	return true
}

/*
	firestoreUpdateDirectoryById
	Function:
		update the data of a directory for a sandbox
	Params:
		sandboxId: id of the sandbox to be read
		dirId: id of the directory to be updated
		dirInfo: JSON to be merged with the directoyr data
	Return:
		true if succeeded, false if anything went wrong
*/
const firestoreUpdateDirectoryById = (sandboxId, dirId, dirInfo) => {
	console.log(`Updating directory ${dirId} from ${sandboxId}....`)

	try{
		let curDate = new Date()
		let obj = {
			update_at: curDate.toISOString(),
			directories: {
				[dirId]: dirInfo
			}
		}
		console.log(obj)
		firestore.collection('sandboxes').doc(sandboxId).set(obj, {merge:true})
		console.log(`Found and updated directory ${dirId} from ${sandboxId}`)
	} catch(err){
		console.log(`Couldn't find directory ${dirId} in sandbox ${sandboxId}`)
		console.log(err)
		return false
	}

	return true
}

/*
	firestoreUpdateModuleById
	Function:
		update the data of a module for a sandbox
	Params:
		sandboxId: id of the sandbox to be read
		dirId: id of the module to be updated
		dirInfo: JSON to be merged with the module document
	Return:
		true if succeeded, false if anything went wrong
*/
const firestoreUpdateModuleById = (sandboxId, moduleId, moduleInfo) => {
	console.log(`Updating module ${moduleId} from ${sandboxId}....`)

	try{
		let curDate = new Date()
		firestore.collection('sandboxes').doc(sandboxId).update({update_at:curDate.toISOString()})
		firestore.collection('sandboxes').doc(sandboxId).collection('modules').doc(moduleId).update(moduleInfo)
		console.log(`Found and updated module ${moduleId} from ${sandboxId}`)
	} catch(err){
		console.log(`Couldn't find module ${moduleId} in sandbox ${sandboxId}`)
		console.log(err)
		return false
	}

	return true
}

/*
	firestoreUpdateMultipleModules
	Function:
		updates multiple modules for a sandbox
	Params:
		sandboxId: id of the sandbox to be read
		modules: array of JSON's of module data
	Return:
		true if succeeded, false if anything went wrong
*/
const firestoreUpdateMultipleModules = (sandboxId, modules) => {
	console.log(`Updating multiple modules for ${sandboxId}....`)

	try{
		let curDate = new Date()
		firestore.collection('sandboxes').doc(sandboxId).update({update_at:curDate.toISOString()})

		let modCollec = firestore.collection('sandboxes').doc(sandboxId).collection('modules')
		modules.forEach((mod)=>{
			modCollec.doc(mod.id).update(mod)
		})
		console.log(`Found and updated modules for ${sandboxId}`)
	} catch(err){
		console.log(`Couldn't find modules for sandbox ${sandboxId}`)
		console.log(err)
		return false
	}

	return true
}

module.exports = {
	firestore,
	firestoreCreateSandbox,
	firestoreCreateDir,
	firestoreCreateModule,
	firestoreGetDirById,
	firestoreGetModuleById,
	firestoreUpdateModuleById,
	firestoreUpdateDirectoryById,
	firestoreGetSandboxById,
	firestoreUpdateSandboxById,
	firestoreForkSandbox,
	firestoreAddTag,
	firestoreDeleteTag,
	firestoreDeleteSandboxById,
	firestoreAddResource,
	firestoreDeleteResource,
	firestoreUpdateMultipleModules,
}

