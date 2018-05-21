const directories = require('./directories');
const modules = require('./modules');
const fork = require('./fork');
const updateModules = require('./updateModules');
const updateSandbox = require('./updateSandbox');
const updateDirectory = require('./updateDirectories');
const getSandbox = require('./getSandbox');
const tags = require('./tags');
const deleteTag = require('./deleteTag');
const deleteSandbox = require('./deleteSandbox');
const resources = require('./resources');
const deleteResource = require('./deleteResource');
const forkURL = require('./forkURL');
const unfurlURL = require('./unfurlURL');
const createSandbox = require('./createSandbox');
const deleteModule = require('./deleteModule');
const deleteDirectory = require('./deleteDirectory');

module.exports = {
	fork,
	directories,
	modules,
	updateModules,
	updateSandbox,
	updateDirectory,
	getSandbox,
	tags,
	deleteTag,
	deleteSandbox,
	resources,
	deleteResource,
	forkURL,
	unfurlURL,
	createSandbox,
	deleteModule,
	deleteDirectory,
}