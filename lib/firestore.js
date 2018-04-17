const firebase = require('firebase')
const uuid = require('uuid')
const shortid = require('shortid')
const omit = require('@f/omit')
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

const create_react_app_template = (sandboxId, publicDirId, srcDirId, moduleIdArr) => (
	{
	npm_dependencies: {
		"react-dom": "16.0.0",
		"react": "16.0.0"
	},
	modules: [
         {
            "title":"package.json",
            "source_id":sandboxId,
            "shortid":moduleIdArr[0],
            "is_binary":false,
            "id":moduleIdArr[0],
            "directory_shortid":null,
            "code":"{\n  \"name\": \"new\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"keywords\": [],\n  \"homepage\": \"https://codesandbox.io/s/new\",\n  \"main\": \"src/index.js\",\n  \"dependencies\": {\n    \"react\": \"16.2.0\",\n    \"react-dom\": \"16.2.0\",\n    \"react-scripts\": \"1.1.0\"\n  },\n  \"devDependencies\": {},\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test --env=jsdom\",\n    \"eject\": \"react-scripts eject\"\n  }\n}\n"
         },
         {
            "title":"index.html",
            "source_id":sandboxId,
            "shortid":moduleIdArr[1],
            "is_binary":false,
            "id":moduleIdArr[1],
            "directory_shortid":publicDirId,
            "code":"<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"utf-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n\t<meta name=\"theme-color\" content=\"#000000\">\n\t<!--\n      manifest.json provides metadata used when your web app is added to the\n      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n    -->\n\t<link rel=\"manifest\" href=\"%PUBLIC_URL%/manifest.json\">\n\t<link rel=\"shortcut icon\" href=\"%PUBLIC_URL%/favicon.ico\">\n\t<!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike \"/favicon.ico\" or \"favicon.ico\", \"%PUBLIC_URL%/favicon.ico\" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n\t<title>React App</title>\n</head>\n\n<body>\n\t<noscript>\n\t\tYou need to enable JavaScript to run this app.\n\t</noscript>\n\t<div id=\"root\"></div>\n\t<!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n</body>\n\n</html>"
         },
         {
            "title":"index.js",
            "source_id":sandboxId,
            "shortid":moduleIdArr[2],
            "is_binary":false,
            "id":moduleIdArr[2],
            "directory_shortid":srcDirId,
            "code":"//hey\nimport React from 'react';\nimport { render } from 'react-dom';\nimport Hello from './Hello';\n\nconst styles = {\n  fontFamily: 'sans-serif',\n  textAlign: 'center',\n};\n\nconst App = () => (\n  <div style={styles}>\n    <Hello name=\"CodeSandbox\" />\n    <h2>Start editing to see some magic happen {'\\u2728'}</h2>\n  </div>\n);\n\nrender(<App />, document.getElementById('root'));\n"
         },
         {
            "title":"Hello.js",
            "source_id":sandboxId,
            "shortid":moduleIdArr[3],
            "is_binary":false,
            "id":moduleIdArr[3],
            "directory_shortid":srcDirId,
            "code":"//this is working?\nimport React from 'react';\n\nexport default ({ name }) => <h1>Hello {name}!</h1>;\n"
         }
	],
	"entry":"src/index.js",
	"directories":[														//directories in sandbox
         {
            "title":"src",
            "source_id":sandboxId,
            "shortid":srcDirId,
            "id":srcDirId,
            "directory_shortid":null
         },
         {
            "title":"public",
            "source_id":sandboxId,
            "shortid":publicDirId,
            "id":publicDirId,
            "directory_shortid":null
         },
      ],
})


const firestore = firebase.initializeApp(config).firestore()

const firestoreCreateSandbox = (args) => {
	console.log(`Creating new sandbox....`)

	let {id, template} = args
	id = "new"
	let curDate = new Date()

	args.description = args.description || null
	args.view_count = args.view_count || 0
	args.user_liked = args.user_liked || false
	args.update_at = args.update_at || curDate.toISOString()
	args.tags = args.tags || []
	args.source_id = args.id
	args.privacy = args.privacy || 0
	args.owned = args.owned || false
	args.original_git_commit_sha = args.original_git_commit_sha || null
	args.like_count = args.like_count || 0
	args.git = args.git || null
	args.forked_from_sandbox = null
	args.author = null
	args.id = "new"
	// args.forked_from_sandbox = args.forked_from_sandbox || {												//TODO: figure out forked data
 //         "view_count":1,
 //         "updated_at":"2018-03-05T21:17:49.262461",
 //         "title":null,
 //         "template":"create-react-app",
 //         "privacy":0,
 //         "like_count":0,
 //         "inserted_at":"2018-03-05T21:17:49.262445",
 //         "id":"jjkp6r6479",
 //         "git":null,
 //         "fork_count":1
 //    }
	args.fork_count = args.fork_count || 0
	args.external_resources = args.external_resources || []
	args.title = args.title || null
	args.version = args.version || 0

	if(!template || template == "create-react-app"){
		let temp = create_react_app_template(id, shortid.generate(), shortid.generate(), [shortid.generate(), shortid.generate(), shortid.generate(), shortid.generate()])
		for(var item in temp)
			args[item] = temp[item]
	}
	//need to add the other templates

	try{
		let {modules, directories} = args
		delete args.modules
		delete args.directories
		firestore.collection('sandboxes').doc(id).set(args)

		let moduleCollec = firestore.collection('sandboxes').doc(id).collection('modules')

		modules.forEach((mod) =>{
			moduleCollec.doc(mod.id).set(mod)
		})

		let tempDir = {}
		directories.forEach((directory) => {
			tempDir[directory.id] = directory
		})

		firestore.collection('sandboxes').doc(id).update({directories:tempDir})
		args.modules = modules
		args.directories = directories

	} catch(err){
		console.log(`Failed to add directory:`)
		console.log(err)
		return {};
	}

	return args;

}

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

const firestoreForkSandbox = async function (originalId, newId) {
	console.log(`Forking sandbox ${originalId} to ${newId}....`)

	let result = await firestoreGetSandboxById(originalId)
	console.log(result)
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

	console.log(newId)
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

	return {data:data}
}

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

module.exports.firestore = firestore
module.exports.firestoreCreateSandbox = firestoreCreateSandbox
module.exports.firestoreCreateDir = firestoreCreateDir
module.exports.firestoreCreateModule = firestoreCreateModule
module.exports.firestoreGetDirById = firestoreGetDirById
module.exports.firestoreGetModuleById = firestoreGetModuleById
module.exports.firestoreUpdateModuleById = firestoreUpdateModuleById
module.exports.firestoreUpdateDirectoryById = firestoreUpdateDirectoryById
module.exports.firestoreGetSandboxById = firestoreGetSandboxById
module.exports.firestoreUpdateSandboxById = firestoreUpdateSandboxById
module.exports.firestoreForkSandbox = firestoreForkSandbox


