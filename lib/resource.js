'use strict'

class Resource {
  constructor (client) {
    this.client = client
  }

  accountPath () {
    if (!this.client.accountId) throw new Error('Account id is required for this resource')
    return this.client.accountId + '/'
  }

  get (url, options) {
    return this.client.get.apply(this.client, arguments)
  }

  post (url, options) {
    return this.client.post.apply(this.client, arguments)
  }
}

module.exports = Resource
