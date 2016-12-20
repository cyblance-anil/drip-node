/* eslint-env jasmine */

'use strict'

const clientSpy = require('../support/client_spy')
const Event = require('../../lib/event')

describe('event', function () {
  const client = clientSpy({accessToken: 'my-api-key', accountId: 'my-account-id'})
  const event = new Event(client)
  const endpoint = 'https://api.getdrip.com/v2/my-account-id/events'
  const email = 'email@mail.com'
  const action = 'Did something'

  describe('create', function () {
    it('should make the correct request and return a promise', function (done) {
      event.create(email, action).then((resp) => {
        const lastReq = client.LAST_REQUEST
        expect(lastReq.method).toEqual('POST')
        expect(lastReq.url).toEqual(endpoint)
        const event = lastReq.body.events[0]
        expect(event.action).toEqual(action)
        expect(event.email).toEqual(email)
        expect(event.properties).toEqual({})
        done()
      }).catch(done.fail)
    })

    it('should work with properites', function (done) {
      event.create(email, action, {type: 'this type'}).then((resp) => {
        const lastReq = client.LAST_REQUEST
        expect(lastReq.method).toEqual('POST')
        expect(lastReq.url).toEqual(endpoint)
        const event = lastReq.body.events[0]
        expect(event.action).toEqual(action)
        expect(event.email).toEqual(email)
        expect(event.properties).toEqual({type: 'this type'})
        done()
      }).catch(done.fail)
    })

    it('should work with properites and options', function (done) {
      event.create(email, action, {type: 'this type'}, {occurred_at: '2016-12-08T03:00:00Z'}).then((resp) => {
        const lastReq = client.LAST_REQUEST
        expect(lastReq.method).toEqual('POST')
        expect(lastReq.url).toEqual(endpoint)
        const event = lastReq.body.events[0]
        expect(event.action).toEqual(action)
        expect(event.email).toEqual(email)
        expect(event.properties).toEqual({type: 'this type'})
        expect(event.occurred_at).toEqual('2016-12-08T03:00:00Z')
        done()
      }).catch(done.fail)
    })

    it('should make the correct request and work with a callback', function (done) {
      event.create(email, action, {}, {}, (error, resp) => {
        if (error) return done.fail(error)
        const lastReq = client.LAST_REQUEST
        expect(lastReq.method).toEqual('POST')
        expect(lastReq.url).toEqual(endpoint)
        const event = lastReq.body.events[0]
        expect(event.action).toEqual(action)
        expect(event.email).toEqual(email)
        done()
      })
    })

    it('should work without passing in properties and options', function (done) {
      event.create(email, action, (error, resp) => {
        if (error) return done.fail(error)
        const lastReq = client.LAST_REQUEST
        expect(lastReq.method).toEqual('POST')
        expect(lastReq.url).toEqual('https://api.getdrip.com/v2/my-account-id/events')
        const event = lastReq.body.events[0]
        expect(event.action).toEqual(action)
        expect(event.email).toEqual(email)
        done()
      })
    })
  })
})
