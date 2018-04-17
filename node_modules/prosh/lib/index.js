/**
 * Imports
 */

const {spawn} = require('child_process')
const {join} = require('path')
const co = require('co')
const extend = require('@f/extend')

let findModules = require('find-mod')

findModules = co.wrap(findModules)

/**
 * Exports
 */

module.exports = prosh

/**
 * prosh
 */

function prosh (command, options = {}) {
  const cwd = options.cwd || process.cwd()
  return findModules(cwd).then(node_modules_dir => {
    const env = extend(
      {},
      process.env,
      {
        PATH: `${process.env.PATH}:${join(node_modules_dir, 'node_modules/.bin')}`
      },
      options.env
    )

    return new Promise(function (resolve, reject) {
      let start = new Date()
      let proc = spawn('/bin/sh', ['-c', command], {
        stdio: options.inherit ? 'inherit' : 'pipe',
        cwd,
        env
      })
      let output = ''
      proc.stdout.on('data', (chunk) => {
        output += chunk
      })
      proc.stderr.on('data', (chunk) => {
        output += chunk
      })
      proc.on('exit', (code) => {
        const time = new Date() - start
        resolve({code, output, time})
      })
    })
  })
}
