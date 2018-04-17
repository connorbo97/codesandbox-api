/**
 * Imports
 */

var omit = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should work', function (t) {
  var obj = {a: 1, b: 2, c: 3}

  t.deepEqual(omit('a', obj), {b: 2, c: 3})
  t.deepEqual(omit(['a', 'b'], obj), {c: 3})

  t.end()
})

test('should curry', function (t) {
  var obj = {a: 1, b: 2}
  var omitA = omit(['a', 'b'])

  t.deepEqual(omitA(obj), {})

  var omitB = omit(['b'])
  t.deepEqual(omitB(obj), {a: 1})
  t.end()
})

test('should take predicates', function (t) {
  var obj = {a: 1, b: 2}

  t.deepEqual(omit(predicate, obj), {b: 2})
  t.end()

  function predicate (key) { return key === 'a' }
})
