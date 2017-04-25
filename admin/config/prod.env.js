const fs = require('fs')
const merge = require('webpack-merge')
const config = {
  NODE_ENV: '"production"',
  api: '"https://localhost:3000/api/"'
} 
module.exports = config
