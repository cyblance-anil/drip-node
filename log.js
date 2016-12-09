const debug = require('debug')('drip-api')

module.exports = function () {
  debug.apply(debug, arguments)
}
