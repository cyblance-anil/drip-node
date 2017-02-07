'use strict'

const _ = require('lodash')

function createEventPayload (email, action, properties, options) {
  options = options || {}
  properties = properties || {}
  let payload = { email: email, action: action, properties: properties }
  // these get passed in as `options` and get set at the top-level of payload
  payload = _.merge(options, payload)
  return payload
}

class Event extends require('./resource') {
  create (email, action, properties, options, callback) {
    // re-assign the callback arg
    if (typeof properties === 'function') {
      callback = properties
      properties = undefined
    }
    if (typeof options === 'function') {
      callback = options
      options = undefined
    }
    return new Promise((resolve, reject) => {
      const payload = {
        events: [createEventPayload(email, action, properties, options)]
      }
      return this.client.post(`${this.accountPath()}events`, payload, callback).then(resolve).catch(reject)
    })
  }

  createBatch (events, callback) {
    return new Promise((resolve, reject) => {
      const payload = {
        batches: [
          {events: events}
        ]
      }
      return this.client.post(`${this.accountPath()}events/batches`, payload, callback).then(resolve).catch(reject)
    })
  }
}

module.exports = Event
