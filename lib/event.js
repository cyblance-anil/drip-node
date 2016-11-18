'use strict'

class Event extends require('./resource') {
  create () {
    this.client.post('/events')
  }
}

module.exports = Event
