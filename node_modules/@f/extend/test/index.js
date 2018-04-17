/**
 * Imports
 */

var extend = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should work', function (t) {
  t.deepEqual(extend({a: 1}, {b: 2}), {a: 1, b: 2})
  t.deepEqual(extend({a: 1}, {b: 2}, {b: 3, c: 3}), {a: 1, b: 3, c: 3})

  t.end()
})
