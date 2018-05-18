const firestore = require('./firestore')
const {firestoreAddResource, firestoreAddTag} = require('./add')
const {firestoreGetDirById, firestoreGetModuleById, firestoreGetSandboxById,} = require('./get')
const {firestoreCreateDir, firestoreCreateModule, firestoreCreateSandbox} = require('./create')
const {firestoreDeleteDirectory, firestoreDeleteModule, firestoreDeleteResource, firestoreDeleteSandboxById, firestoreDeleteTag} = require('./delete')
const {firestoreForkSandbox} = require('./fork')
const {firestoreUpdateSandboxById, firestoreUpdateDirectoryById, firestoreUpdateModuleById, firestoreUpdateMultipleModules} = require('./update')

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
	firestoreDeleteModule,
	firestoreDeleteDirectory,
}
