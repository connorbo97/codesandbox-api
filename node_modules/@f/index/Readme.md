
# index

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Generate a keyed map from a list

## Installation

    $ npm install @f/index

## Usage

Use it to figure out what was created/removed from lists, or to test membership, etc.., e.g.

```js
var index = require('@f/index')
var reduce = require('@f/reduce')

function removedItems (cur, prev) {
  var map = index(getKey, cur)
  return reduce(function (removed, item) {
    if (!map[getKey(item)]) removed.push(item)
    return removed
  }, [], prev)
}
```

## API

### index(keyFn?, itemFn?, list)

- `keyFn` - Optional. Defaults to identity. A function that takes an item of `list` and returns a `key` appropriate for use in an object map.
- `itemFn` - Optional. If two arguments are passed, `list` is the second argument. Transforms the value in the indexed map.
- `list` - The list of things you want to index

**Returns:** An indexed map of the items in `list` to their corresponding `key` as returned by `fn(item)`.

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/index.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/index
[git-image]: https://img.shields.io/github/tag/micro-js/index.svg?style=flat-square
[git-url]: https://github.com/micro-js/index
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/index.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/index
