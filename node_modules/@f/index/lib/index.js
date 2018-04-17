/**
 * Modules
 */

var reduce = require('@f/reduce-array')
var identity = require('@f/identity')

/**
 * Expose index
 */

module.exports = index

/**
 * index
 */

function index (keyFn, itemFn, list) {
  if (arguments.length === 2) {
    list = itemFn
    itemFn = identity
  }

  if (arguments.length === 1) {
    list = keyFn
    keyFn = identity
    itemFn = identity
  }

  return reduce(function (map, item, idx) {
    map[keyFn(item)] = itemFn(item, idx)
    return map
  }, {}, list)
}
