/**
 * Imports
 */

const test = require('tape')
const prosh = require('../')

/**
 * Tests
 */

const capture = true

test('should echo and consume', (t) => {
  prosh('echo "hello world"').then(({output}) => {
    t.equal(output, 'hello world\n')
    t.end()
  }).catch(err => console.log('error', err))
})

test('should multi line echo and consume', (t) => {
  prosh('echo "hello world"\necho "hello world"').then(({output}) => {
    t.equal(output, 'hello world\nhello world\n')
    t.end()
  })
})

test('should get environment variables', (t) => {
  process.env.SECRET = 'hello-world'
  prosh('echo $SECRET').then(({output}) => {
    t.equal(output, 'hello-world\n')
    t.end()
  })
})
