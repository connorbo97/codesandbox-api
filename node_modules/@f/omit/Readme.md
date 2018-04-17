
# omit

Simple, tiny object omit utility

## Installation

    $ npm install @f/omit

## Usage

`omit(obj, keys)`

  * `keys` - A single key, array of keys, object (with truthy values), or truth-test function for keys to omit
  * `obj` - An object from which you'd like to omit some keys

Returns a new object with `keys` omitted from it.

## Currying/indexing

If you pass only one argument to `omit` it will return a partially applied omit function. If that argument is an array of keys, it will be indexed into an object so that it can be processed quickly. So if you want to remove a long list of keys from an object and that list is static, you should do this:

```javascript
var omit = require('@f/omit')
var keys = ['some', 'long', 'list', 'of', 'keys']

var filterKeys = omit(keys)
```

## License

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
