/**
 * Modules
 */

const {resolve, join} = require('path')
const fs = require('mz/fs')

/**
 * Expose
 */

module.exports = findMod

/**
 * find-mod
 */

function * findMod (dir) {
  while (! (yield fs.exists(join(dir, 'node_modules')))) {
    dir = resolve(join(dir, '..'))
    if (dir === '/') {
      throw new Error('node_modules not found')
    }
  }
  return dir
}
