/**
 * Imports
 */

var isFunction = require('@f/is-function')
var forEach = require('@f/foreach-obj')
var isObject = require('@f/is-object')
var identity = require('@f/identity')
var isArray = require('@f/is-array')
var index = require('@f/index')

/**
 * Object omit wrapper that curries
 * and indexes if possible
 */

function omit (keys, obj) {
  if (arguments.length === 1) {
    if (isArray(keys)) {
      keys = index(identity, T, keys)
    }

    return function (obj) {
      return internalOmit.call(this, keys, obj)
    }
  }

  return internalOmit.call(this, keys, obj)
}

/**
 * Omit implementation
 */

function internalOmit (keys, obj) {
  var result = {}

  if (isArray(keys)) {
    forEach(function (val, key) {
      if (keys.indexOf(key) === -1) {
        result[key] = val
      }
    }, obj)
  } else if (isObject(keys)) {
    forEach(function (val, key) {
      if (!keys[key]) {
        result[key] = val
      }
    }, obj)
  } else if (isFunction(keys)) {
    var self = this
    forEach(function (val, key) {
      if (!keys.call(self, key)) {
        result[key] = val
      }
    }, obj)
  } else {
    forEach(function (val, key) {
      if (keys !== key) {
        result[key] = val
      }
    }, obj)
  }

  return result
}

/**
 * Helpers
 */

function T () { return true }

/**
 * Exports
 */

module.exports = omit
