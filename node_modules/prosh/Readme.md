
# prosh

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

A promise shell.

## Installation

    $ npm install prosh

## Usage

```js
import prosh from 'prosh'
import co from 'co'

co(function * () {
  yield prosh(`
    echo "hello world"
    echo "hello world"
    `)
})

```

## API

### prosh(command)

- `command` - command string the same way you would write it in a shell

**Returns:** a promise the resolves {code, output, time}, where `code` is exit code, `output` is stdout and stderr and `time` is run time

## License

MIT

[travis-image]: https://img.shields.io/travis/joshrtay/prosh.svg?style=flat-square
[travis-url]: https://travis-ci.org/joshrtay/prosh
[git-image]: https://img.shields.io/github/tag/joshrtay/prosh.svg
[git-url]: https://github.com/joshrtay/prosh
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/prosh.svg?style=flat-square
[npm-url]: https://npmjs.org/package/prosh
