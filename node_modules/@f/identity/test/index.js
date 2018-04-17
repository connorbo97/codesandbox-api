/**
 * Imports
 */

var identity = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should return arg', function (t) {
  var obj = {}
  var arr = []
  t.equal(identity(1), 1)
  t.equal(identity(obj), obj)
  t.equal(identity(arr), arr)
  t.end()
})
