/**
 * Imports
 */

var index = require('..')
var test = require('tape')
var identity = require('@f/identity')

/**
 * Tests
 */

test('should work', function (t) {
  t.deepEqual(index(identity, [1,2,3,4]), {1: 1, 2: 2, 3:3, 4:4})
  t.deepEqual(index(identity, plus1, [1,2,3,4]), {1: 2, 2:3, 3:4, 4:5})
  t.end()
})

test('should work with only one argument', function (t) {
  t.deepEqual(index([1, 2, 3]), {1: 1, 2: 2, 3: 3})
  t.end()
})

/**
 * Helpers
 */

function plus1 (n) {
  return n + 1
}
