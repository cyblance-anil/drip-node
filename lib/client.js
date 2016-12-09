'use strict'

const log = require('../log')
const requestPromise = require('request-promise')
const VERSION = require('../version')
const resources = {
  Account: require('./account'),
  Event: require('./event')
}

class Client {
  constructor (options) {
    log('initializing', options)
    if (!options) return this._missingCredentials()
    this.apiKey = options.apiKey
    this.accountId = options.accountId
    this.accessToken = options.accessToken
    this.version = VERSION
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
      log('initializing resource:', resourceName)
      // assign this instance to `this` client instance
      this._resources[resourceName] = resource
    }
  }

  // these are the public methods available on the drip client.
  // users of the client library will call these directly
  _prepMethods () {
    this.accounts = this._resources.account.list.bind(this._resources.account)
    this.trackEvent = this._resources.event.create.bind(this._resources.event)
  }

  request (options, cb) {
    if (cb) {
      requestPromise(options).then(function (resp) {
        cb(null, resp)
      }).catch(cb)
    } else {
      return requestPromise(options)
    }
  }

  get (url, data, callback) {
    log('attempting GET', url, data)
    return this.request({
      method: 'GET',
      headers: this.requestHeaders(),
      url: this.urlBase() + url,
      body: data,
      json: true
    }, callback)
  }

  post (url, data, callback) {
    log('attempting POST', url, data)
    return this.request({
      method: 'POST',
      headers: this.requestHeaders(),
      url: this.urlBase() + url,
      body: data,
      json: true
    }, callback)
  }

  urlBase () {
    if (this.accessToken) {
      return 'https://api.getdrip.com/v2/'
    // basic auth if no accessToken
    } else {
      return `https://${this.apiKey}:@api.getdrip.com/v2/`
    }
  }

  requestHeaders () {
    const headers = {
      'User-Agent': `Drip Node ${this.version}`,
      'Content-Type': 'application/vnd.api+json',
      'Accept': '*/*'
    }
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`
    }
    return headers
  }
}

module.exports = Client
