'use strict'

class Resource {
  constructor (client) {
    this.client = client
  }

  get (url, options) {
    return this.client.get(arguments)
  }

  post (url, options) {
    return this.client.post(arguments)
  }
}

module.exports = Resource
