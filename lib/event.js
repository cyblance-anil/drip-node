'use strict'

class Event extends require('./resource') {
  create (email, action, properties, options, callback) {
    if (typeof email === 'undefined') throw new Error('Email is required for event tracking')
    if (typeof action === 'undefined') throw new Error('Action is required for event tracking')
    if (typeof properties === 'function') callback = properties
    if (typeof options === 'function') callback = options
    return new Promise((resolve, reject) => {
      properties = properties || {}
      options = options || {}
      const payload = {
        email: email,
        action: action,
        properties: properties
      }
      const optional = ['id', 'occurred_at', 'prospect']
      optional.forEach((p) => {
        if (typeof options[p] !== undefined) {
          payload[p] = options[p]
        }
      })
      return this.client.post(`${this.accountPath()}events`, payload, callback).then(resolve).catch(reject)
    })
  }

  createBatch (events) {
    throw new Error('TODO')
  }
}

module.exports = Event
