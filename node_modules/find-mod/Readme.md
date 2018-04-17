
# find-mod

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Find the closest directory containing node_modules.

## Installation

    $ npm install find-mod

## Usage

```js
const findMod = require('find-mod')

co.wrap(function * ()  {
  yield findMod(__dirname) // => $HOME/find-mod
})

```

## API

### findMod(dir)

- `dir` - Director to start search.

**Returns:**

## License

MIT

[travis-image]: https://img.shields.io/travis/joshrtay/find-mod.svg?style=flat-square
[travis-url]: https://travis-ci.org/joshrtay/find-mod
[git-image]: https://img.shields.io/github/tag/joshrtay/find-mod.svg?style=flat-square
[git-url]: https://github.com/joshrtay/find-mod
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/find-mod.svg?style=flat-square
[npm-url]: https://npmjs.org/package/find-mod
