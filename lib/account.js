'use strict'

class Account extends require('./resource') {
  list () {
    this.get('/accounts')
  }
}

module.exports = Account
