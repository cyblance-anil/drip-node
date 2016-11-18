'use strict'

const Client = require('./lib/client')

function init (apiKey, accountId, options) {
  const client = new Client(apiKey, accountId, options)
  return client
}

module.exports = init
