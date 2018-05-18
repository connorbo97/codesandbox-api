/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreForkSandbox} = require('../firestore')

const forkURL = async function (body) {
	//console.log("Forking URL..")
	if(!body || !body.tasks){
		//console.log("No body or no tasks")
		//console.log(body)
		return {error:true, data:"No tasks provided"}
	}

	//console.log("Forking tasks")
	let failed = false
	let instances = []
	//testing purposes
	// body.tasks = [{taskUrl:'vasre/vcxzf', update:{id:1}}, {taskUrl:'vasre/svelte', update:{id:2}}, {taskUrl:'vasre/vanilla', update:{id:3}}]
	for(i in body.tasks){
			let {taskUrl, update} = body.tasks[i]
			let sandboxID = ""
			let index = -1
			let newID = shortid.generate()

			index = taskUrl.lastIndexOf('/') + 1																//index is the index of the first character after the last /, i.e. http://localhost/s/new would return the index of n
			sandboxID = taskUrl.substr(index)
			let {error} = await firestoreForkSandbox(sandboxID, newID)
			if(error){																													//if the sandbox fork failed, stop
				failed = true
				return {error:true, data:"Failed to fork all sandboxes"}
			}
			instances.push({
				instance: taskUrl.substr(0, index) + newID,												//instance is the url to the new, forked sandbox
				id: update.id,
			})
	}

	//console.log("Forked URLs")

	return {error:false, data:instances}
}

module.exports = forkURL
