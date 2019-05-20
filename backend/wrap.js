'use strict'

const assert = require('assert')

module.exports = fn => (req, res, next) => {
  assert.strictEqual(
    fn.constructor.name,
    'AsyncFunction',
    `${fn.name} is not assignable to type '"AsyncFunction"'`
  )

  fn(req, res, next)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
}
