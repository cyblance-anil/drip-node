/* eslint-env jasmine */

'use strict'

const Client = require('../../lib/client')

describe('Client', function () {
  it('should return a client instance', function () {
    const client = new Client({apiKey: 'my-api-key', accountId: 'my-account-id'})
    expect(client.apiKey).toEqual('my-api-key')
    expect(client.accountId).toEqual('my-account-id')
    expect(typeof client.accounts).toEqual('function')
    expect(typeof client.trackEvent).toEqual('function')
    expect(typeof client.trackEvents).toEqual('function')
  })

  it('should return a client missingCredentials state if none are given', function () {
    const client = new Client()
    expect(client.apiKey).toBeUndefined()
    expect(client.accountId).toBeUndefined()
    expect(client.missingCredentials).toEqual(true)
  })

  describe('requestHeaders', function () {
    it('should have the correct headers for basic auth', function () {
      const client = new Client({apiKey: 'my-api-key', accountId: 'my-account-id'})
      expect(client.requestHeaders()).toEqual({
        'User-Agent': 'Drip Node 0.0.1',
        'Content-Type': 'application/vnd.api+json',
        Accept: '*/*'
      })
    })

    it('should have the correct headers for bearer token auth', function () {
      const client = new Client({accessToken: 'my-access-token', accountId: 'my-account-id'})
      expect(client.requestHeaders()).toEqual({
        'User-Agent': 'Drip Node 0.0.1',
        'Content-Type': 'application/vnd.api+json',
        Accept: '*/*',
        Authorization: 'Bearer my-access-token'
      })
    })
  })

  describe('urlBase', function () {
    it('should have the correct url for basic auth', function () {
      const client = new Client({apiKey: 'my-api-key', accountId: 'my-account-id'})
      expect(client.urlBase()).toEqual('https://my-api-key:@api.getdrip.com/v2/')
    })

    it('should have the correct url for token auth', function () {
      const client = new Client({accessToken: 'my-access-token', accountId: 'my-account-id'})
      expect(client.urlBase()).toEqual('https://api.getdrip.com/v2/')
    })
  })
})
