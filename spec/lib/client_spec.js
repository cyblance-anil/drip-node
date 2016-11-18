/* eslint-env jasmine */

'use strict'

const Client = require('../../lib/client')

describe('Client', function () {
  it('should return a client instance', function () {
    const client = new Client('my-api-key', 'my-account-id')
    expect(client.apiKey).toEqual('my-api-key')
    expect(client.accountId).toEqual('my-account-id')
    expect(typeof client.accounts).toEqual('function')
    expect(typeof client.track_event).toEqual('function')
  })

  it('should return a client missingCredentials state if none are given', function () {
    const client = new Client()
    expect(client.apiKey).toBeUndefined()
    expect(client.accountId).toBeUndefined()
    expect(client.missingCredentials).toEqual(true)
  })
})
