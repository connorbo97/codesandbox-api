/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreForkSandbox} = require('../firestore')

const forkURL = async function (body) {
	//console.log("Forking tasks")
	if(!body || !body.tasks){
		//console.log("No body or no tasks")
		//console.log(body)
		return {error:true, data:"No tasks provided"}
	}
	
	let failed = false
	let instances = []

	//testing purposes
	// body.tasks = [{taskUrl:'vasre/new', update:{id:1}}, {taskUrl:'vasre/svelte', update:{id:2}}, {taskUrl:'vasre/vanilla', update:{id:3}}]
	for(i in body.tasks){
		try{
			let {taskUrl, update} = body.tasks[i]
			let newID = shortid.generate()

			//index of the first character after the last /, i.e. http://localhost/s/new would return the index of n
			let index = taskUrl.lastIndexOf('/') + 1

			//bc it's the index of the last / + 1, index is 0 if no instance was found
			if(index == 0){
				return {error:true, data:"Failed to fork all sandboxes. task " + (i + 1) + " does not contain a /"}
			}

			let {error} = await firestoreForkSandbox(taskUrl.substr(index), newID)

			//if the sandbox fork failed, stop forking
			if(error){
				return {error:true, data:"Failed to fork all sandboxes"}
			}
			
			instances.push({
				instance: taskUrl.substr(0, index) + newID,												//instance is the url to the new, forked sandbox
				id: update.id,
			})
		} catch(err){
			console.log("Failed to fork sandbox " + (i + 1))
			console.log(err)
			return {error:true, data:"Failed to fork all sandboxes"}
		}
	}

	//console.log("Forked URLs")

	return {error:false, data:instances}
}

module.exports = forkURL
