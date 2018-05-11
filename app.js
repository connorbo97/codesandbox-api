const express = require('express');
const directories = require('./lib/directories');
const modules = require('./lib/modules');
const fork = require('./lib/fork');
const updateModules = require('./lib/updateModules');
const updateSandbox = require('./lib/updateSandbox');
const updateDirectory = require('./lib/updateDirectories');
const getSandbox = require('./lib/getSandbox');
const tags = require('./lib/tags');
const deleteTag = require('./lib/deleteTag');
const deleteSandbox = require('./lib/deleteSandbox');
const resources = require('./lib/resources');
const deleteResource = require('./lib/deleteResource');
const forkURL = require('./lib/forkURL');
const unfurlURL = require('./lib/unfurlURL');
const createSandbox = require('./lib/createSandbox');
const deleteModule = require('./lib/deleteModule');
const deleteDirectory = require('./lib/deleteDirectory');

const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

const app = express();
app.use(cors());
app.use(bodyParser.json())

//all projects stored under {current directory}/projects/{UNIQUE NAME HASH}

//no required request parameters
// const DIR = __dirname + '/projects'


app.get("/api/v1/test", upload.array(), async function (req, res) {
  console.log(`======Creating new sandbox start=======\n`)
  console.time('createSand')
  let data = await createSandbox();

  console.timeEnd('createSand')
  console.log(`======Creating new sandbox start=======\n`)

  // return res.status(200).send({"data":{"view_count":322117,"version":32,"user_liked":false,"updated_at":"2018-04-11T12:55:29.664977","title":null,"template":"create-react-app","tags":[],"source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","privacy":0,"owned":false,"original_git_commit_sha":null,"original_git":null,"npm_dependencies":{"react-dom":"16.0.0","react":"16.0.0"},"modules":[{"title":"package.json","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"ZGQK6","is_binary":false,"id":"dd3f0f6a-4555-457f-b2af-963bf00f9172","directory_shortid":null,"code":"{\n  \"name\": \"new\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"keywords\": [],\n  \"main\": \"src/index.js\",\n  \"dependencies\": {\n    \"react\": \"16.2.0\",\n    \"react-dom\": \"16.2.0\",\n    \"react-scripts\": \"1.1.0\"\n  },\n  \"devDependencies\": {},\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test --env=jsdom\",\n    \"eject\": \"react-scripts eject\"\n  }\n}\n"},{"title":"Hello.js","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"NKZ4K","is_binary":false,"id":"7546d2c4-6657-46d9-ba63-8564e0dcb463","directory_shortid":"GXOoy","code":"import React from 'react';\n\nexport default ({ name }) => <h1>Hello {name}!</h1>;\n"},{"title":"index.js","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"wRo98","is_binary":false,"id":"928871a1-bbdc-425c-ace2-0b302b14a58a","directory_shortid":"GXOoy","code":"import React from 'react';\nimport { render } from 'react-dom';\nimport Hello from './Hello';\n\nconst styles = {\n  fontFamily: 'sans-serif',\n  textAlign: 'center',\n};\n\nconst App = () => (\n  <div style={styles}>\n    <Hello name=\"CodeSandbox\" />\n    <h2>Start editing to see some magic happen {'\\u2728'}</h2>\n  </div>\n);\n\nrender(<App />, document.getElementById('root'));\n"},{"title":"index.html","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"BA1N","is_binary":false,"id":"9c54d8d0-5a0e-4e5f-8794-3092757733ee","directory_shortid":"rgkK4","code":"<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"utf-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n\t<meta name=\"theme-color\" content=\"#000000\">\n\t<!--\n      manifest.json provides metadata used when your web app is added to the\n      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n    -->\n\t<link rel=\"manifest\" href=\"%PUBLIC_URL%/manifest.json\">\n\t<link rel=\"shortcut icon\" href=\"%PUBLIC_URL%/favicon.ico\">\n\t<!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike \"/favicon.ico\" or \"favicon.ico\", \"%PUBLIC_URL%/favicon.ico\" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n\t<title>React App</title>\n</head>\n\n<body>\n\t<noscript>\n\t\tYou need to enable JavaScript to run this app.\n\t</noscript>\n\t<div id=\"root\"></div>\n\t<!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n</body>\n\n</html>"}],"like_count":211,"id":"new","git":null,"forked_from_sandbox":null,"fork_count":0,"external_resources":[],"entry":"src/index.js","directories":[{"title":"src","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"GXOoy","id":"d27aefca-c15c-41a1-b9d5-bd362fdd7f19","directory_shortid":null},{"title":"public","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"rgkK4","id":"859f77fe-8e09-4efb-bd44-f66ea4f949e4","directory_shortid":null}],"description":null,"author":null}})

  if (data.id) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({title:["No body or no directory"]});
  }
})

app.get("/api/v1/sandboxes/:sandboxID", upload.array(), async function (req, res) {
  console.log(`======Getting sandbox ${req.params.sandboxID} start=======`)
  console.time('getSandbox')
  if(!req.body){
    console.log("no body")
    return res.status(200).send({ ok: false, error: "No body found" });
  }

  let { error, data } = await getSandbox(req.params.sandboxID);

  console.timeEnd('getSandbox')
  console.log(`======Getting sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors:data});
  }

})

app.put("/api/v1/sandboxes/:sandboxID", upload.array(), async function (req, res) {
  console.log(`======Updating sandbox ${req.params.sandboxID} start=======`)
  console.time('updateSandbox')
  
  if(!req.body){
    console.log("no body")
    return res.status(200).send({ ok: false, error: "No body found" });
  }

  let { error, data } = await updateSandbox(req.params.sandboxID, req.body);

  console.timeEnd('updateSandbox')
  console.log(`======Updating sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors:data});
  }

})

app.post("/api/v1/sandboxes/:sandboxID/directories", upload.array(), async function (req, res) {
  console.log(`======Directories for sandbox ${req.params.sandboxID} start=======`)
  console.time('createDirectory')
  
  if(!req.body){
    console.log("no body")
    return res.status(200).send({ ok: false, error: "No body found" });
  }

  let { error, data } = await directories(req.params.sandboxID, req.body);

  console.timeEnd('createDirectory')
  console.log(`======Directories for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors:data});
  }

})


app.post("/api/v1/sandboxes/:sandboxID/fork", upload.array(), async function (req, res) {
  //req body is empty
  //fork does not update data
  //when you try to save  a non owned project, i think it just copies the data and changes owned = true and the author if you're signed in
  //then after the fork, it saves the changes; seems to be a put, not post request though to change a module....
  //also the url is the id for the project (not source-id, the id; which is the shortid for the source-id)
  console.log(`======Fork for sandbox ${req.params.sandboxID} start=======`)
  console.time('forkSandbox')
  // if(!req.body){
  //   console.log("no body")
  //   return res.status(200).send({ ok: false, error: "No body found" });
  // }

  let { error, data } = await fork(req.params.sandboxID);

  console.timeEnd('forkSandbox')
  console.log(`======Fork for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors:{}});
  }

})

app.post("/api/v1/sandboxes/:sandboxID/modules", upload.array(), async function (req, res) {
  console.log(`======Modules for sandbox ${req.params.sandboxID} start=======`)
  console.time('createModule')
  
  if(!req.body){
    console.log("no body")
    return res.status(200).send({errors:{title:["No body given"]}});
  }

  let { error, data } = await modules(req.params.sandboxID, req.body);

  console.timeEnd('createModule')
  console.log(`======Modules for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors: data});
  }

})

app.put("/api/v1/sandboxes/:sandboxID/directories/:dirID", upload.array(), async function (req, res) {
  console.log(`======Editing module ${req.params.dirID} for sandbox ${req.params.sandboxID} start=======`)
  console.time('updateDirectory')
  
  if(!req.body){
    console.log("no body")
    return res.status(200).send({errors:{title:["No body given"]}});
  }

  let { error, data } = await updateDirectory(req.params.sandboxID, req.params.dirID, req.body);

  console.timeEnd('updateDirectory')
  console.log(`======Editing module ${req.params.dirID} for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors: data});
  }

})



app.put("/api/v1/sandboxes/:sandboxID/modules/:moduleID", upload.array(), async function (req, res) {
  console.log(`======Editing module ${req.params.moduleID} for sandbox ${req.params.sandboxID} start=======`)
  console.time('updateModule')
  
  if(!req.body){
    console.log("no body")
    return res.status(200).send({errors:{title:["No body given"]}});
  }
  
  let { error, data } = await updateModules(req.params.sandboxID, req.params.moduleID, req.body);

  console.timeEnd('updateModule')
  console.log(`======Editing module ${req.params.moduleID} for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors: data});
  }

})

app.put("/api/v1/sandboxes/:sandboxId/modules/mupdate", upload.array(), async function (req, res) {
  console.log(`======Updating multiple modules for sandbox ${req.params.sandboxID} start=======`)
  console.time('multipleUpdate')
  
  if(!req.body || !req.body.modules){
    console.log("no body or no modules")
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

  console.timeEnd('multipleUpdate')
  console.log(`======Editing module for sandbox ${req.params.sandboxID} finish======\n`)
  return res.status(200).send({data:result})
})

app.post("/api/v1/sandboxes/:sandboxID/tags", upload.array(), async function (req, res) {
  console.log(`======Editing tags for sandbox ${req.params.sandboxID} start=======`)
  console.time('addTag')
  
  if(!req.body){
    console.log("no body")
    return res.status(200).send({errors:{title:["No body given"]}});
  }

  let { error, data } = await tags(req.params.sandboxID, req.body);

  console.timeEnd('addTag')
  console.log(`======Editing tags for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors: data});
  }

})

app.delete("/api/v1/sandboxes/:sandboxID/modules/:moduleID", upload.array(), async function (req, res) {
  console.log(`======Removing module ${req.params.moduleID} from sandbox ${req.params.sandboxID} start=======`)
  console.time('deleteTag')
  
  let ok = await deleteModule(req.params.sandboxID, req.params.moduleID);

  console.timeEnd('deleteTag')
  console.log(`======Removing module ${req.params.moduleID} from sandbox ${req.params.sandboxID} finish======\n`)
  if (ok) {
    return res.status(204).send()
  } else {
    return res.status(400).send();
  }

})

app.delete("/api/v1/sandboxes/:sandboxID/directories/:directoryId", upload.array(), async function (req, res) {
  console.log(`======Removing directory ${req.params.directoryId} from sandbox ${req.params.sandboxID} start=======`)
  console.time('deleteTag')
  
  let ok = await deleteDirectory(req.params.sandboxID, req.params.directoryId);

  console.timeEnd('deleteTag')
  console.log(`======Removing directory ${req.params.directoryId} from sandbox ${req.params.sandboxID} finish======\n`)
  if (ok) {
    return res.status(204).send()
  } else {
    return res.status(400).send();
  }

})



app.delete("/api/v1/sandboxes/:sandboxID/tags/:tag", upload.array(), async function (req, res) {
  console.log(`======Removing tag ${req.params.tag} for sandbox ${req.params.sandboxID} start=======`)
  console.time('deleteTag')
  
  let { error, data } = await deleteTag(req.params.sandboxID, req.params.tag);

  console.timeEnd('deleteTag')
  console.log(`======Removing tag ${req.params.tag} for sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send({errors: data});
  }

})

app.delete("/api/v1/sandboxes/:sandboxID", upload.array(), async function (req, res) {
  console.log(`======Deleting sandbox ${req.params.sandboxID} start=======`)
  console.time('deleteSandbox')
  
  let { error, data } = await deleteSandbox(req.params.sandboxID, req.params.tag);

  console.timeEnd('deleteSandbox')
  console.log(`======Deleting sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send()
  } else {
    return res.status(200).send();
  }

})

app.post("/api/v1/sandboxes/:sandboxID/resources", upload.array(), async function (req, res) {
  console.log(`======Adding resource to sandbox ${req.params.sandboxID} start=======`)
  console.time('addResource')
  
  let { error, data } = await resources(req.params.sandboxID, req.body);

  console.timeEnd('addResource')
  console.log(`======Adding resource to sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send();
  }

})

app.delete("/api/v1/sandboxes/:sandboxID/resources", upload.array(), async function (req, res) {
  console.log(`======Deleting resource from sandbox ${req.params.sandboxID} start=======`)
  console.time('deleteResource')
  

  let { error, data } = await deleteResource(req.params.sandboxID, req.body);

  console.timeEnd('deleteResource')
  console.log(`======Deleting resource from sandbox ${req.params.sandboxID} finish======\n`)
  if (!error) {
    return res.status(200).send({data})
  } else {
    return res.status(200).send();
  }

})

app.post("/api/v1/copy", upload.array(), async function (req, res) {
  console.log(`======Making copy of sandbox at url start=======`)
  console.time('sandboxCopy')
  

  let { error, data } = await forkURL(req.body);

  console.timeEnd('sandboxCopy')
  console.log(`======Making copy of sandbox at url finish======\n`)
  if (!error) {
    return res.status(200).send({ok:true,instance:data})
  } else {
    return res.status(200).send({ok:false,error:data});
  }

})

/*
{
  ok: boolean,
  error: 'if failed error message',
  displayName: 'string',
  url: 'string - to the template',
  imageUrl: 'string - optional',
  type: 'assigment'
}
*/

app.post("/api/v1/unfurl", upload.array(), async function (req, res) {
  console.log(`======Unfurl url start=======`)
  console.time('sandboxCopy')
  

  let { error, data } = await unfurlURL(req.body);

  console.timeEnd('sandboxCopy')
  console.log(`======Unfurl url finish======\n`)
  if (!error) {
    return res.status(200).send({ok:true, ...data})
  } else {
    return res.status(200).send({ok:false,error:data});
  }

})


// Start the server
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});


//original response data
//{"data":{"view_count":322117,"version":32,"user_liked":false,"updated_at":"2018-04-11T12:55:29.664977","title":null,"template":"create-react-app","tags":[],"source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","privacy":0,"owned":false,"original_git_commit_sha":null,"original_git":null,"npm_dependencies":{"react-dom":"16.0.0","react":"16.0.0"},"modules":[{"title":"package.json","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"ZGQK6","is_binary":false,"id":"dd3f0f6a-4555-457f-b2af-963bf00f9172","directory_shortid":null,"code":"{\n  \"name\": \"new\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"keywords\": [],\n  \"main\": \"src/index.js\",\n  \"dependencies\": {\n    \"react\": \"16.2.0\",\n    \"react-dom\": \"16.2.0\",\n    \"react-scripts\": \"1.1.0\"\n  },\n  \"devDependencies\": {},\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test --env=jsdom\",\n    \"eject\": \"react-scripts eject\"\n  }\n}\n"},{"title":"Hello.js","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"NKZ4K","is_binary":false,"id":"7546d2c4-6657-46d9-ba63-8564e0dcb463","directory_shortid":"GXOoy","code":"import React from 'react';\n\nexport default ({ name }) => <h1>Hello {name}!</h1>;\n"},{"title":"index.js","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"wRo98","is_binary":false,"id":"928871a1-bbdc-425c-ace2-0b302b14a58a","directory_shortid":"GXOoy","code":"import React from 'react';\nimport { render } from 'react-dom';\nimport Hello from './Hello';\n\nconst styles = {\n  fontFamily: 'sans-serif',\n  textAlign: 'center',\n};\n\nconst App = () => (\n  <div style={styles}>\n    <Hello name=\"CodeSandbox\" />\n    <h2>Start editing to see some magic happen {'\\u2728'}</h2>\n  </div>\n);\n\nrender(<App />, document.getElementById('root'));\n"},{"title":"index.html","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"BA1N","is_binary":false,"id":"9c54d8d0-5a0e-4e5f-8794-3092757733ee","directory_shortid":"rgkK4","code":"<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"utf-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n\t<meta name=\"theme-color\" content=\"#000000\">\n\t<!--\n      manifest.json provides metadata used when your web app is added to the\n      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n    -->\n\t<link rel=\"manifest\" href=\"%PUBLIC_URL%/manifest.json\">\n\t<link rel=\"shortcut icon\" href=\"%PUBLIC_URL%/favicon.ico\">\n\t<!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike \"/favicon.ico\" or \"favicon.ico\", \"%PUBLIC_URL%/favicon.ico\" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n\t<title>React App</title>\n</head>\n\n<body>\n\t<noscript>\n\t\tYou need to enable JavaScript to run this app.\n\t</noscript>\n\t<div id=\"root\"></div>\n\t<!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n</body>\n\n</html>"}],"like_count":211,"id":"new","git":null,"forked_from_sandbox":null,"fork_count":0,"external_resources":[],"entry":"src/index.js","directories":[{"title":"src","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"GXOoy","id":"d27aefca-c15c-41a1-b9d5-bd362fdd7f19","directory_shortid":null},{"title":"public","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"rgkK4","id":"859f77fe-8e09-4efb-bd44-f66ea4f949e4","directory_shortid":null}],"description":null,"author":null}}
//my responses
//{"data":{"id":"HyWx8L-nf","template":"create-react-app","description":null,"view_count":0,"user_liked":false,"update_at":1523832296895,"tags":[],"source_id":"HyWx8L-nf","privacy":0,"owned":true,"original_git_commit_sha":null,"like_count":0,"git":null,"forked_from_sandbox":{"view_count":1,"updated_at":"2018-03-05T21:17:49.262461","title":null,"template":"create-react-app","privacy":0,"like_count":0,"inserted_at":"2018-03-05T21:17:49.262445","id":"jjkp6r6479","git":null,"fork_count":1},"fork_count":0,"external_resources":[],"title":null,"npm_dependencies":{"react-dom":"16.0.0","react":"16.0.0"},"entry":"src/index.js","modules":[{"title":"package.json","source_id":"HyWx8L-nf","shortid":"SkM-eULZnz","is_binary":false,"id":"SkM-eULZnz","directory_shortid":null,"code":"{\n  \"name\": \"new\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"keywords\": [],\n  \"homepage\": \"https://codesandbox.io/s/new\",\n  \"main\": \"src/index.js\",\n  \"dependencies\": {\n    \"react\": \"16.2.0\",\n    \"react-dom\": \"16.2.0\",\n    \"react-scripts\": \"1.1.0\"\n  },\n  \"devDependencies\": {},\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test --env=jsdom\",\n    \"eject\": \"react-scripts eject\"\n  }\n}\n"},{"title":"index.html","source_id":"HyWx8L-nf","shortid":"SJ7bgUIZhf","is_binary":false,"id":"SJ7bgUIZhf","directory_shortid":"rye-l8UWnM","code":"<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"utf-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n\t<meta name=\"theme-color\" content=\"#000000\">\n\t<!--\n      manifest.json provides metadata used when your web app is added to the\n      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n    -->\n\t<link rel=\"manifest\" href=\"%PUBLIC_URL%/manifest.json\">\n\t<link rel=\"shortcut icon\" href=\"%PUBLIC_URL%/favicon.ico\">\n\t<!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike \"/favicon.ico\" or \"favicon.ico\", \"%PUBLIC_URL%/favicon.ico\" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n\t<title>React App</title>\n</head>\n\n<body>\n\t<noscript>\n\t\tYou need to enable JavaScript to run this app.\n\t</noscript>\n\t<div id=\"root\"></div>\n\t<!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n</body>\n\n</html>"},{"title":"index.js","source_id":"HyWx8L-nf","shortid":"BkNWe8UZ3M","is_binary":false,"id":"BkNWe8UZ3M","directory_shortid":"HJWWlUI-2z","code":"//hey\nimport React from 'react';\nimport { render } from 'react-dom';\nimport Hello from './Hello';\n\nconst styles = {\n  fontFamily: 'sans-serif',\n  textAlign: 'center',\n};\n\nconst App = () => (\n  <div style={styles}>\n    <Hello name=\"CodeSandbox\" />\n    <h2>Start editing to see some magic happen {'\\u2728'}</h2>\n  </div>\n);\n\nrender(<App />, document.getElementById('root'));\n"},{"title":"Hello.js","source_id":"HyWx8L-nf","shortid":"B1SbgLUZnM","is_binary":false,"id":"B1SbgLUZnM","directory_shortid":"HJWWlUI-2z","code":"import React from 'react';\n\nexport default ({ name }) => <h1>Hello {name}!</h1>;\n"}],"directories":[{"title":"src","source_id":"HyWx8L-nf","shortid":"HJWWlUI-2z","id":"HJWWlUI-2z","directory_shortid":null},{"title":"public","source_id":"HyWx8L-nf","shortid":"rye-l8UWnM","id":"rye-l8UWnM","directory_shortid":null}]}}
//{"data":{"id":"new","template":"create-react-app","description":null,"view_count":0,"user_liked":false,"update_at":1523833053961,"tags":[],"source_id":"HJIyt8Z2G","privacy":0,"owned":true,"original_git_commit_sha":null,"like_count":0,"git":null,"forked_from_sandbox":null,"author":null,"fork_count":0,"external_resources":[],"title":null,"npm_dependencies":{"react-dom":"16.0.0","react":"16.0.0"},"entry":"src/index.js","modules":[{"title":"package.json","source_id":"HJIyt8Z2G","shortid":"S1M8yYIW2G","is_binary":false,"id":"S1M8yYIW2G","directory_shortid":null,"code":"{\n  \"name\": \"new\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"keywords\": [],\n  \"homepage\": \"https://codesandbox.io/s/new\",\n  \"main\": \"src/index.js\",\n  \"dependencies\": {\n    \"react\": \"16.2.0\",\n    \"react-dom\": \"16.2.0\",\n    \"react-scripts\": \"1.1.0\"\n  },\n  \"devDependencies\": {},\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test --env=jsdom\",\n    \"eject\": \"react-scripts eject\"\n  }\n}\n"},{"title":"index.html","source_id":"HJIyt8Z2G","shortid":"rkQ8JYL-3G","is_binary":false,"id":"rkQ8JYL-3G","directory_shortid":"Hke8kY8bnG","code":"<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"utf-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n\t<meta name=\"theme-color\" content=\"#000000\">\n\t<!--\n      manifest.json provides metadata used when your web app is added to the\n      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n    -->\n\t<link rel=\"manifest\" href=\"%PUBLIC_URL%/manifest.json\">\n\t<link rel=\"shortcut icon\" href=\"%PUBLIC_URL%/favicon.ico\">\n\t<!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike \"/favicon.ico\" or \"favicon.ico\", \"%PUBLIC_URL%/favicon.ico\" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n\t<title>React App</title>\n</head>\n\n<body>\n\t<noscript>\n\t\tYou need to enable JavaScript to run this app.\n\t</noscript>\n\t<div id=\"root\"></div>\n\t<!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n</body>\n\n</html>"},{"title":"index.js","source_id":"HJIyt8Z2G","shortid":"BJV8yF8W3z","is_binary":false,"id":"BJV8yF8W3z","directory_shortid":"rJ-UyFUWhM","code":"//hey\nimport React from 'react';\nimport { render } from 'react-dom';\nimport Hello from './Hello';\n\nconst styles = {\n  fontFamily: 'sans-serif',\n  textAlign: 'center',\n};\n\nconst App = () => (\n  <div style={styles}>\n    <Hello name=\"CodeSandbox\" />\n    <h2>Start editing to see some magic happen {'\\u2728'}</h2>\n  </div>\n);\n\nrender(<App />, document.getElementById('root'));\n"},{"title":"Hello.js","source_id":"HJIyt8Z2G","shortid":"S1SLkt8-3z","is_binary":false,"id":"S1SLkt8-3z","directory_shortid":"rJ-UyFUWhM","code":"import React from 'react';\n\nexport default ({ name }) => <h1>Hello {name}!</h1>;\n"}],"directories":[{"title":"src","source_id":"HJIyt8Z2G","shortid":"rJ-UyFUWhM","id":"rJ-UyFUWhM","directory_shortid":null},{"title":"public","source_id":"HJIyt8Z2G","shortid":"Hke8kY8bnG","id":"Hke8kY8bnG","directory_shortid":null}]}}
//{"data":{"id":"new","template":"create-react-app","description":null,"view_count":0,"user_liked":false,"update_at":"2018-04-15T23:10:47.993Z","tags":[],"source_id":"B1eZ2UZnf","privacy":0,"owned":false,"original_git_commit_sha":null,"like_count":0,"git":null,"forked_from_sandbox":null,"author":null,"fork_count":0,"external_resources":[],"title":null,"version":1,"npm_dependencies":{"react-dom":"16.0.0","react":"16.0.0"},"entry":"src/index.js","modules":[{"title":"package.json","source_id":"B1eZ2UZnf","shortid":"rJzgW2I-nG","is_binary":false,"id":"rJzgW2I-nG","directory_shortid":null,"code":"{\n  \"name\": \"new\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"keywords\": [],\n  \"homepage\": \"https://codesandbox.io/s/new\",\n  \"main\": \"src/index.js\",\n  \"dependencies\": {\n    \"react\": \"16.2.0\",\n    \"react-dom\": \"16.2.0\",\n    \"react-scripts\": \"1.1.0\"\n  },\n  \"devDependencies\": {},\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test --env=jsdom\",\n    \"eject\": \"react-scripts eject\"\n  }\n}\n"},{"title":"index.html","source_id":"B1eZ2UZnf","shortid":"HyXlbnLZhf","is_binary":false,"id":"HyXlbnLZhf","directory_shortid":"HkxgZnI-2M","code":"<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"utf-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n\t<meta name=\"theme-color\" content=\"#000000\">\n\t<!--\n      manifest.json provides metadata used when your web app is added to the\n      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n    -->\n\t<link rel=\"manifest\" href=\"%PUBLIC_URL%/manifest.json\">\n\t<link rel=\"shortcut icon\" href=\"%PUBLIC_URL%/favicon.ico\">\n\t<!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike \"/favicon.ico\" or \"favicon.ico\", \"%PUBLIC_URL%/favicon.ico\" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n\t<title>React App</title>\n</head>\n\n<body>\n\t<noscript>\n\t\tYou need to enable JavaScript to run this app.\n\t</noscript>\n\t<div id=\"root\"></div>\n\t<!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n</body>\n\n</html>"},{"title":"index.js","source_id":"B1eZ2UZnf","shortid":"HkVlbnL-3z","is_binary":false,"id":"HkVlbnL-3z","directory_shortid":"ryZe-38Z3f","code":"//hey\nimport React from 'react';\nimport { render } from 'react-dom';\nimport Hello from './Hello';\n\nconst styles = {\n  fontFamily: 'sans-serif',\n  textAlign: 'center',\n};\n\nconst App = () => (\n  <div style={styles}>\n    <Hello name=\"CodeSandbox\" />\n    <h2>Start editing to see some magic happen {'\\u2728'}</h2>\n  </div>\n);\n\nrender(<App />, document.getElementById('root'));\n"},{"title":"Hello.js","source_id":"B1eZ2UZnf","shortid":"ryBlZnLZnM","is_binary":false,"id":"ryBlZnLZnM","directory_shortid":"ryZe-38Z3f","code":"import React from 'react';\n\nexport default ({ name }) => <h1>Hello {name}!</h1>;\n"}],"directories":[{"title":"src","source_id":"B1eZ2UZnf","shortid":"ryZe-38Z3f","id":"ryZe-38Z3f","directory_shortid":null},{"title":"public","source_id":"B1eZ2UZnf","shortid":"HkxgZnI-2M","id":"HkxgZnI-2M","directory_shortid":null}]}}

//fork request body
//empty

//fork output
//{"data":{"view_count":0,"version":0,"user_liked":false,"updated_at":"2018-04-15T23:18:43.957877","title":null,"template":"create-react-app","tags":[],"source_id":"184cc149-b7be-43bd-9e01-74447a92ae5a","privacy":0,"owned":true,"original_git_commit_sha":null,"original_git":null,"npm_dependencies":{"react-dom":"16.0.0","react":"16.0.0"},"modules":[{"title":"index.html","source_id":"184cc149-b7be-43bd-9e01-74447a92ae5a","shortid":"BA1N","is_binary":false,"id":"26c0924a-42ee-427f-acbf-0043b6e77e4c","directory_shortid":"rgkK4","code":"<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"utf-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n\t<meta name=\"theme-color\" content=\"#000000\">\n\t<!--\n      manifest.json provides metadata used when your web app is added to the\n      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n    -->\n\t<link rel=\"manifest\" href=\"%PUBLIC_URL%/manifest.json\">\n\t<link rel=\"shortcut icon\" href=\"%PUBLIC_URL%/favicon.ico\">\n\t<!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike \"/favicon.ico\" or \"favicon.ico\", \"%PUBLIC_URL%/favicon.ico\" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n\t<title>React App</title>\n</head>\n\n<body>\n\t<noscript>\n\t\tYou need to enable JavaScript to run this app.\n\t</noscript>\n\t<div id=\"root\"></div>\n\t<!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n</body>\n\n</html>"},{"title":"index.js","source_id":"184cc149-b7be-43bd-9e01-74447a92ae5a","shortid":"wRo98","is_binary":false,"id":"c88ac448-7045-46a5-ab85-c370e309651a","directory_shortid":"GXOoy","code":"import React from 'react';\nimport { render } from 'react-dom';\nimport Hello from './Hello';\n\nconst styles = {\n  fontFamily: 'sans-serif',\n  textAlign: 'center',\n};\n\nconst App = () => (\n  <div style={styles}>\n    <Hello name=\"CodeSandbox\" />\n    <h2>Start editing to see some magic happen {'\\u2728'}</h2>\n  </div>\n);\n\nrender(<App />, document.getElementById('root'));\n"},{"title":"Hello.js","source_id":"184cc149-b7be-43bd-9e01-74447a92ae5a","shortid":"NKZ4K","is_binary":false,"id":"9631ec6e-d573-4c2a-84f7-d1f98b1f16f0","directory_shortid":"GXOoy","code":"import React from 'react';\n\nexport default ({ name }) => <h1>Hello {name}!</h1>;\n"},{"title":"package.json","source_id":"184cc149-b7be-43bd-9e01-74447a92ae5a","shortid":"ZGQK6","is_binary":false,"id":"6225f9fe-8003-4f0e-abf8-34c53716dfad","directory_shortid":null,"code":"{\n  \"name\": \"new\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"keywords\": [],\n  \"main\": \"src/index.js\",\n  \"dependencies\": {\n    \"react\": \"16.2.0\",\n    \"react-dom\": \"16.2.0\",\n    \"react-scripts\": \"1.1.0\"\n  },\n  \"devDependencies\": {},\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test --env=jsdom\",\n    \"eject\": \"react-scripts eject\"\n  }\n}\n"}],"like_count":0,"id":"vn5z78yy07","git":null,"forked_from_sandbox":null,"fork_count":0,"external_resources":[],"entry":"src/index.js","directories":[{"title":"src","source_id":"184cc149-b7be-43bd-9e01-74447a92ae5a","shortid":"GXOoy","id":"0fdfe5da-f112-4563-9b78-6d762dcf98df","directory_shortid":null},{"title":"public","source_id":"184cc149-b7be-43bd-9e01-74447a92ae5a","shortid":"rgkK4","id":"e28834f8-9857-4b57-95ad-1634b1e15920","directory_shortid":null}],"description":null,"author":null}}
