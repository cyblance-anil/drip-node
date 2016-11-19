'use strict'

const debug = require('debug')('drip')
const resources = {
  Account: require('./account'),
  Event: require('./event')
}

class Client {
  constructor (apiKey, accountId, options) {
    debug('initializing', apiKey, accountId, options)
    this.apiKey = apiKey
    this.accountId = accountId
    if (!(this.apiKey && this.accountId)) this._missingCredentials()
    this.options = options || {}
    this._prepResources()
    this._prepMethods()
  }

  _missingCredentials () {
    this.missingCredentials = true
    console.error('missing credentials')
  }

  _prepResources () {
    this._resources = {}
    for (let type in resources) {
      // make an instance of each resource
      const resourceName = type.toLowerCase()
      const resource = new resources[type](this)
      debug('initializing resource:', resourceName)
      // assign this instance to `this` client instance
      this._resources[resourceName] = resource
    }
  }

  // these are the public methods available on the drip client.
  // users of the client library will call these directly.directly
  _prepMethods () {
    this.accounts = this._resources.account.list.bind(this._resources.account)
    this.trackEvent = this._resources.event.create.bind(this._resources.event)
  }

  get (url, options) {
    debug('attempting GET', url)
  }

  post (url, options) {
    debug('attempting POST', url)
  }
}

module.exports = Client
