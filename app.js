const express = require('express');

const {
	fork, directories, modules, tags, resources,
	deleteModule,deleteDirectory, deleteTag, deleteResource, deleteSandbox, 
	updateModules, updateSandbox, updateDirectory,
  getSandbox, 
  createSandbox,
  forkURL, unfurlURL, 
} = require('./lib')

const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

const URL_ROOT = "/api/v1"

const app = express();
app.use(cors());
app.use(bodyParser.json())

/** 
 * GET Requests
*/
//NOTE: should never be called by CodeSandbox, used for testing purposes/ initializing sandboxes
app.get(URL_ROOT + "/test", upload.array(), async function (req, res) {
  //console.log(`======Creating new sandbox start=======\n`)
  //console.time('createSand')
  let data = await createSandbox();

  //console.timeEnd('createSand')
  //console.log(`======Creating new sandbox start=======\n`)

  if (data.id) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({title:["No body or no directory"]});
  }
})

/** 
 * GET /sandboxes/:sandboxID - returns data representing the sandbox at sandboxID
 * 
 * @param {string} sandboxID - id of the sandbox to be read
 * @returns {json} - 
    {
      data: JSON of sandbox information
      errors: array of error titles if any errors occured
    }
*/
app.get(URL_ROOT + "/sandboxes/:sandboxID", upload.array(), async function (req, res) {
  //console.log(`======Getting sandbox ${req.params.sandboxID} start=======`)
  //console.time('getSandbox')
  if(!req.body){
    //console.log("no body")
    return res.status(200).send({ ok: false, error: "No body found" });
  }

  let { error, data } = await getSandbox(req.params.sandboxID);

  //console.timeEnd('getSandbox')
  //console.log(`======Getting sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors:data});
  }

})


/** 
 * POST Requests
*/

/** 
 * POST /sandboxes/:sandboxID/directories - add a directory to sandboxID with the information in the body
 * 
 * @param {string} sandboxID - id of the sandbox to be edited
 * Body Keys
 * @key {json} directory - describes the directory to be added (i.e. the name, the id of the directory it is in)
 * @returns {json} - 
    {
      data: JSON of directory
      errors: array of error titles if any errors occured
    }
*/
app.post(URL_ROOT + "/sandboxes/:sandboxID/directories", upload.array(), async function (req, res) {
  //console.log(`======Directories for sandbox ${req.params.sandboxID} start=======`)
  //console.time('createDirectory')

  if(!req.body){
    //console.log("no body")
    return res.status(200).send({ ok: false, error: "No body found" });
  }

  let { error, data } = await directories(req.params.sandboxID, req.body);

  //console.timeEnd('createDirectory')
  //console.log(`======Directories for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors:data});
  }

})

/** 
 * POST /sandboxes/:sandboxID/fork - forks the sandbox at sandboxID
 * 
 * @param {string} sandboxID - id of the sandbox to be forked
 * @returns {json} - 
    {
      data: JSON of the forked sandbox
      errors: array of error titles if any errors occured
    }
*/
app.post(URL_ROOT + "/sandboxes/:sandboxID/fork", upload.array(), async function (req, res) {
  //console.log(`======Fork for sandbox ${req.params.sandboxID} start=======`)
  //console.time('forkSandbox')

  let { error, data } = await fork(req.params.sandboxID);

  //console.timeEnd('forkSandbox')
  //console.log(`======Fork for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors:{}});
  }

})

/** 
 * POST /sandboxes/:sandboxID/modules - add a module (a file) to sandboxID with the information in the body
 * 
 * @param {string} sandboxID - id of the sandbox to be added to
 * Body Keys
 * @key {json} module - describes the moduel to be added (i.e. the name of the module, the id of the directory it is in, the code within the file)
 * @returns {json} - 
    {
      data: JSON of module
      errors: array of error titles if any errors occured
    }
*/
app.post(URL_ROOT + "/sandboxes/:sandboxID/modules", upload.array(), async function (req, res) {
  //console.log(`======Modules for sandbox ${req.params.sandboxID} start=======`)
  //console.time('createModule')

  if(!req.body){
    //console.log("no body")
    return res.status(200).send({errors:{title:["No body given"]}});
  }

  let { error, data } = await modules(req.params.sandboxID, req.body);

  //console.timeEnd('createModule')
  //console.log(`======Modules for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors: data});
  }

})

/** 
 * POST /sandboxes/:sandboxID/tags - add a tag to sandboxID with the information in the body
 * 
 * @param {string} sandboxID - id of the sandbox to be added to
 * Body Keys
 * @key {string} tag - the tag to be added to the project
 * @returns {json} - 
    {
      data: array of all the tags for the project
      errors: array of error titles if any errors occured
    }
*/
app.post(URL_ROOT + "/sandboxes/:sandboxID/tags", upload.array(), async function (req, res) {
  //console.log(`======Editing tags for sandbox ${req.params.sandboxID} start=======`)
  //console.time('addTag')

  if(!req.body){
    //console.log("no body")
    return res.status(200).send({errors:{title:["No body given"]}});
  }

  let { error, data } = await tags(req.params.sandboxID, req.body);

  //console.timeEnd('addTag')
  //console.log(`======Editing tags for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors: data});
  }

})

/** 
 * POST /sandboxes/:sandboxID/resources - add a resource to sandboxID with the information in the body
 * 
 * @param {string} sandboxID - id of the sandbox to be added to
 * Body Keys
 * @key {string} resource - the resource to be added to the project
 * @returns {json} - 
    {
      data: array of all the external_resources for the project
      errors: array of error titles if any errors occured
    }
*/
app.post(URL_ROOT + "/sandboxes/:sandboxID/resources", upload.array(), async function (req, res) {
  //console.log(`======Adding resource to sandbox ${req.params.sandboxID} start=======`)
  //console.time('addResource')

  let { error, data } = await resources(req.params.sandboxID, req.body);

  //console.timeEnd('addResource')
  //console.log(`======Adding resource to sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send();
  }

})

/** 
 * POST /api/copy - fork all of the tasks and return an array of the forked tasks
 * 
 * Body Keys
 * @key {array} tasks - array of strings; each string is a sandbox to be forked
 * @returns {json} - 
    {
      ok: true if succeeded in forking all tasks, false otherwise
      instance: array of the forked URLs
      error: string with error message
    }
*/
app.post("/api/copy", upload.array(), async function (req, res) {
  //console.log(`======Making copy of sandbox at url start=======`)
  //console.time('sandboxCopy')


  let { error, data } = await forkURL(req.body);

  //console.timeEnd('sandboxCopy')
  //console.log(`======Making copy of sandbox at url finish======\n`)
  if (!error) {
    return res.status(200).send({ok:true,instance:data})
  } else {
    return res.status(200).send({ok:false,error:data});
  }

})

/** 
 * POST /api/unfurl - get unfurl information on URL given in the body
 * 
 * Body Keys
 * @key {string} taskUrl - URL to get unfurl information for
 * @returns {json} - 
    {
      ok: true if succeeded, false otherwise
      error: string with error message if error occured
      displayName: string, title of the sandbox if it has one, otherwise the id of the sandbox
      url: string, url of the sandbox
      imageUrl: string (optional) //not implemented at the moment
      type: string //currently always sets it to assignment
    }
*/
app.post("/api/unfurl", upload.array(), async function (req, res) {
  //console.log(`======Unfurl url start=======`)
  //console.time('sandboxCopy')

  /*
  unfurl structure:
  {
    ok: boolean,
    error: 'if failed error message',
    displayName: 'string',
    url: 'string - to the template',
    imageUrl: 'string - optional',
    type: 'assigment'
  }
  */

  let { error, data } = await unfurlURL(req.body);

  //console.timeEnd('sandboxCopy')
  //console.log(`======Unfurl url finish======\n`)
  if (!error) {
    return res.status(200).send({ok:true, ...data})
  } else {
    return res.status(200).send({ok:false,error:data});
  }

})


/** 
 * PUT Requests
*/

/** 
 * PUT /sandboxes/:sandboxID/directories/:dirID - edit the directory at dirID in sandbox sandboxID
 * 
 * @param {string} sandboxID - id of sandbox containing target directory
 * @param {string} dirID - id of directory to be edited
 * Body Keys
 * @key {JSON} directory - information to be merged with the directory
 * @returns {json} - 
    {
      data: JSON representing directory
      errors: array of error titles if any errors occured
    }
*/
app.put(URL_ROOT + "/sandboxes/:sandboxID/directories/:dirID", upload.array(), async function (req, res) {
  //console.log(`======Editing directory ${req.params.dirID} for sandbox ${req.params.sandboxID} start=======`)
  //console.time('updateDirectory')

  if(!req.body){
    //console.log("no body")
    return res.status(200).send({errors:{title:["No body given"]}});
  }

  let { error, data } = await updateDirectory(req.params.sandboxID, req.params.dirID, req.body);

  //console.timeEnd('updateDirectory')
  //console.log(`======Editing directory ${req.params.dirID} for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors: data});
  }

})

/** 
 * PUT /sandboxes/:sandboxID/directories/:moduleID - edit the module at moduleID in sandbox sandboxID
 * 
 * @param {string} sandboxID - id of sandbox containing target directory
 * @param {string} moduleID - id of module to be edited
 * Body Keys
 * @key {JSON} modules - information to be merged with the module (if it is a mupdate it is an array of jsons)
 * @returns {json} - 
    {
      data: JSON of the edited module (array of JSON's if mupdate) 
      errors: array of error titles if any errors occured
    }
*/
app.put(URL_ROOT + "/sandboxes/:sandboxID/modules/:moduleID", upload.array(), async function (req, res) {
  //console.log(`======Editing module ${req.params.moduleID} for sandbox ${req.params.sandboxID} start=======`)
  //console.time('updateModule')

  if(!req.body){
    //console.log("no body")
    return res.status(200).send({errors:{title:["No body given"]}});
  }

  let { error, data } = await updateModules(req.params.sandboxID, req.params.moduleID, req.body);

  //console.timeEnd('updateModule')
  //console.log(`======Editing module ${req.params.moduleID} for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors: data});
  }

})

/**  
 * PUT /sandboxes/:sandboxID - edit the sandbox at sandboxID (usually used to change the description or title)
 * 
 * @param {string} sandboxID - id of sandbox to be edited
 * Body Keys
 * @key {JSON} sandbox - information to be merged with the sandbox
 * @returns {json} - 
    {
      data: JSON representing sandbox
      errors: array of error titles if any errors occured
    }
*/
app.put(URL_ROOT + "/sandboxes/:sandboxID", upload.array(), async function (req, res) {
  //console.log(`======Updating sandbox ${req.params.sandboxID} start=======`)
  //console.time('updateSandbox')

  if(!req.body){
    //console.log("no body")
    return res.status(200).send({ ok: false, error: "No body found" });
  }

  let { error, data } = await updateSandbox(req.params.sandboxID, req.body);

  //console.timeEnd('updateSandbox')
  //console.log(`======Updating sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors:data});
  }

})


/** 
 * DELETE Requests
*/

/**  
 * DELETE /sandboxes/:sandboxID/modules/:moduleID - delete the module at moduleID in sandbox sandboxID
 * 
 * @param {string} sandboxID - id of sandbox containing target module
 * @param {string} moduleID - id of module to be deleted
*/
app.delete(URL_ROOT + "/sandboxes/:sandboxID/modules/:moduleID", upload.array(), async function (req, res) {
  //console.log(`======Removing module ${req.params.moduleID} from sandbox ${req.params.sandboxID} start=======`)
  //console.time('deleteTag')

  let ok = await deleteModule(req.params.sandboxID, req.params.moduleID);

  //console.timeEnd('deleteTag')
  //console.log(`======Removing module ${req.params.moduleID} from sandbox ${req.params.sandboxID} finish======\n`)
  if (ok) {
    return res.status(204).send()
  } else {
    return res.status(400).send();
  }

})

/**  
 * DELETE /sandboxes/:sandboxID/directories/:directoryId - delete the directory at directoryId in sandbox sandboxID
 * 
 * @param {string} sandboxID - id of sandbox containing target directory
 * @param {string} directoryId - id of directory to be deleted
*/
app.delete(URL_ROOT + "/sandboxes/:sandboxID/directories/:directoryId", upload.array(), async function (req, res) {
  //console.log(`======Removing directory ${req.params.directoryId} from sandbox ${req.params.sandboxID} start=======`)
  //console.time('deleteTag')

  let ok = await deleteDirectory(req.params.sandboxID, req.params.directoryId);

  //console.timeEnd('deleteTag')
  //console.log(`======Removing directory ${req.params.directoryId} from sandbox ${req.params.sandboxID} finish======\n`)
  if (ok) {
    return res.status(204).send()
  } else {
    return res.status(400).send();
  }

})

/**  
 * DELETE /sandboxes/:sandboxID/tags/:tag - delete the tag tag in sandbox sandboxID
 * 
 * @param {string} sandboxID - id of sandbox containing target tag
 * @param {string} tag - tag to be removed
 * @returns {json} -
    {
      data: array of tags left in project
      errors: array of error titles if any errors occured
    }
*/
app.delete(URL_ROOT + "/sandboxes/:sandboxID/tags/:tag", upload.array(), async function (req, res) {
  //console.log(`======Removing tag ${req.params.tag} for sandbox ${req.params.sandboxID} start=======`)
  //console.time('deleteTag')

  let { error, data } = await deleteTag(req.params.sandboxID, req.params.tag);

  //console.timeEnd('deleteTag')
  //console.log(`======Removing tag ${req.params.tag} for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors: data});
  }

})

/**  
 * DELETE /sandboxes/:sandboxID - delete the sandbox at sandboxID
 * 
 * @param {string} sandboxID - id of sandbox to be deleted
*/
app.delete(URL_ROOT + "/sandboxes/:sandboxID", upload.array(), async function (req, res) {
  //console.log(`======Deleting sandbox ${req.params.sandboxID} start=======`)
  //console.time('deleteSandbox')

  let { error, data } = await deleteSandbox(req.params.sandboxID, req.params.tag);

  //console.timeEnd('deleteSandbox')
  //console.log(`======Deleting sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send()
  } else {
    return res.status(200).send();
  }

})

/**  
 * DELETE /sandboxes/:sandboxID/resources - delete the resource in the body in sandbox sandboxID
 * 
 * @param {string} sandboxID - id of sandbox containing target resource
 * Body Keys
 * @key {string} id - resource to be removed from sandbox
 * @returns {json} -
    {
      data: array of external_resources still in the project
    }
*/
app.delete(URL_ROOT + "/sandboxes/:sandboxID/resources", upload.array(), async function (req, res) {
  //console.log(`======Deleting resource from sandbox ${req.params.sandboxID} start=======`)
  //console.time('deleteResource')


  let { error, data } = await deleteResource(req.params.sandboxID, req.body);

  //console.timeEnd('deleteResource')
  //console.log(`======Deleting resource from sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send();
  }

})


// Start the server
const PORT = process.env.PORT || 8082;    //8082 was arbitrarly chosen
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
