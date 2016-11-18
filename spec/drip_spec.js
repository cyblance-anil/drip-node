/* eslint-env jasmine */

describe('entry point', function () {
  it('should export a function', function () {
    const drip = require('../drip.js')
    expect(typeof drip).toEqual('function')
  })
})

