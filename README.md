# Drip Node client library (unofficial)

[![Build Status](https://travis-ci.org/crowdcst/drip-node.svg?branch=master)](https://travis-ci.org/crowdcst/drip-node)

A Node toolkit for the [Drip](https://www.getdrip.com/) API. Based on the official [Ruby client library](https://github.com/DripEmail/drip-ruby): 

## Installation

Requirements:

* node v4 or newer

yarn

```
yarn add drip-api
```

npm

```
npm i drip-api --save
```

## Authentication

For private integrations, you may use your personal API key (found
[here](https://www.getdrip.com/user/edit)) via the `apiKey` option:

```javascript
client = require('drip-api')({
  apiKey: "YOUR_API_KEY",
  accountId: "YOUR_ACCOUNT_ID"
})
```

For public integrations, pass in the user's OAuth token via the `accessToken`
option:

```javascript
client = require('drip-api')({
  accessToken: "YOUR_ACCESS_TOKEN", // obtained from oauth
  accountId: "YOUR_ACCOUNT_ID"      // obtained from oauth
})
```

Your account ID can be found [here](https://www.getdrip.com/settings/site).
Most API actions require an account ID, with the exception of methods like
the "list accounts" endpoint.

## Usage


Since the Drip client is a flat API client, most API actions are available
as methods on the client object. The following methods are currently available:

| Action                     | Method                                                             |
| :------------------------- | :------------------------------------------------------------------|
| List accounts              | `client.accounts(callback)`                                        |
| Track an event             | `client.trackEvent(email, action, properties, options, callback)`  |
| Track a batch of  events   | `client.trackEvents([<events array>])`  |

* All methods return promises and also support an asynchronous callback. For example:

```javascript
// promises
client.accounts().then(function (response) {
  // response
}).catch(function (error) {
  // error
})

// callbacks
client.accounts(function (error, response) {
  // if (error) // handle error
  // response
})
```


**Note:** We do not have complete API coverage yet. If we are missing an API method
that you need to use in your application, please file an issue and/or open a
pull request. [See the official REST API docs](https://www.getdrip.com/docs/rest-api)
for a complete API reference.

## Debugging

This library follows the [debug logger](https://www.npmjs.com/package/debug) standard for optional logger output. To see logger output from this library set DEBUG env variable to 'drip'. For example to see log output in tests:

```
DEBUG=drip npm test
```

## Contributing

1. Fork it ( https://github.com/crowdcst/drip/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

Notes about contributing

* Be sure to include jasmine specs for new functionality
* Follow the [StandardJS](http://standardjs.com/) formatting guidelines. Our test command enforces these guidelines and builds will fail if your code is not compliant.
* Use [yarn](https://yarnpkg.com/) (`yarn add`) for adding new packages so that yarn.lock gets updated
