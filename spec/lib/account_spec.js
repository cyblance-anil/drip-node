/* eslint-env jasmine */

'use strict'

const clientSpy = require('../support/client_spy')
const Account = require('../../lib/account')

describe('account', function () {
  beforeEach(function () {
    this.client = clientSpy({apiKey: 'my-api-key', accountId: 'my-account-id'})
    this.account = new Account(this.client)
  })

  describe('list', function () {
    it('should make the right request and return a promise', function (done) {
      this.account.list().then((resp) => {
        const lastReq = this.client.LAST_REQUEST
        expect(lastReq.method).toEqual('GET')
        expect(lastReq.url).toEqual('https://my-api-key:@api.getdrip.com/v2/accounts')
        done()
      }).catch(done.fail)
    })

    it('should make the right request and work with a callback', function (done) {
      this.account.list((error, resp) => {
        if (error) return done.fail(error)
        const lastReq = this.client.LAST_REQUEST
        expect(lastReq.method).toEqual('GET')
        expect(lastReq.url).toEqual('https://my-api-key:@api.getdrip.com/v2/accounts')
        done()
      })
    })
  })
})
