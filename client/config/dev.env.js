var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var config = require('./index')
var port = 8081

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  port: port,
  index: '"http://localhost:' + port + '"',
  api: '"http://localhost:8000/api/"',
})
