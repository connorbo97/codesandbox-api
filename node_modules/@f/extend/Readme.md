
# extend

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Simple shallow extend implementation

## Installation

    $ npm install @f/extend

## Usage

```js
var extend = require('@f/extend')

extend({}, defaultOpts, opts)
```

## API

### extend(dst, ...objs)

- `dst` - The destination object to copy the properties of `...objs` into
- `...objs` - A variable length list of objects who's properties you want to copy into `dst`. They will be copied in increasing order of precedence (i.e. those that come later will overwrite those that come earlier)

**Returns:** `dst`

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/extend.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/extend
[git-image]: https://img.shields.io/github/tag/micro-js/extend.svg?style=flat-square
[git-url]: https://github.com/micro-js/extend
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/extend.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/extend
