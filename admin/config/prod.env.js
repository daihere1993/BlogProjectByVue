const fs = require('fs')
const merge = require('webpack-merge')
const config = {
  NODE_ENV: '"production"',
  api: '"http://localhost:3000/api/"'
} 
module.exports = config
