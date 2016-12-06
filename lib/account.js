'use strict'

class Account extends require('./resource') {
  list (callback) {
    return this.get('accounts', {}, callback)
  }
}

module.exports = Account
