/**
 * Imports
 */

const test = require('tape')
const findMod = require('..')
const {join, resolve} = require('path')
const co = require('co')

/**
 * Tests
 */

test('should work', co.wrap(function * (t) {
  const dir = yield findMod(__dirname)
  t.equal(dir, resolve(join(__dirname, '..')))
  t.end()
}))
