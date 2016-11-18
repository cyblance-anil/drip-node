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
    for (let type in resources) {
      // make an instance of each resource
      const resourceName = type.toLowerCase()
      const resource = new resources[type](this)
      debug('initializing resource:', resourceName)
      // assign this instance to `this` client instance
      this[resourceName] = resource
    }
  }

  _prepMethods () {
    this.accounts = this.account.list.bind(this.accounts)
    this.trackEvent = this.event.create.bind(this.event)
  }

  get (url, options) {
    debug('attempting GET', url)
  }

  post (url, options) {
    debug('attempting POST', url)
  }
}

module.exports = Client
