/**
 * Modules
 */

var forEach = require('@f/foreach-obj')

/**
 * Expose extend
 */

module.exports = extend

/**
 * Extend
 */

function extend (dst) {
  for (var i = 1; i < arguments.length; i++) {
    extendTwo(dst, arguments[i])
  }

  return dst
}

function extendTwo (dst, src) {
  forEach(function (val, key) {
    dst[key] = val
  }, src)
}
