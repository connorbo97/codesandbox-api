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
app.put(URL_ROOT + "/sandboxes/:sandboxID/directories/:dirID", upload.array(), async function (req, res) {
  //console.log(`======Editing module ${req.params.dirID} for sandbox ${req.params.sandboxID} start=======`)
  //console.time('updateDirectory')

  if(!req.body){
    //console.log("no body")
    return res.status(200).send({errors:{title:["No body given"]}});
  }

  let { error, data } = await updateDirectory(req.params.sandboxID, req.params.dirID, req.body);

  //console.timeEnd('updateDirectory')
  //console.log(`======Editing module ${req.params.dirID} for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors: data});
  }

})

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

app.put(URL_ROOT + "/sandboxes/:sandboxId/modules/mupdate", upload.array(), async function (req, res) {
  //console.log(`======Updating multiple modules for sandbox ${req.params.sandboxID} start=======`)
  //console.time('multipleUpdate')

  if(!req.body || !req.body.modules){
    //console.log("no body or no modules")
    return res.status(200).send({errors:{title:["No body given"]}});
  }

  let result = []
  let failed = false
  for(let i =0; i < req.body.modules.length; i++){
    let res = await updateModules(req.params.sandboxId, req.body[i].id, req.body[i])
    if(res.error){
      failed = true
      break
    }
    result.push(req.body[i])
  }

  if(failed)
    return res.status(200).send({errors:{title:["Failed to save all files"]}});

  //console.timeEnd('multipleUpdate')
  //console.log(`======Editing module for sandbox ${req.params.sandboxID} finish======\n`)
  return res.status(200).send({data:result})
})

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
