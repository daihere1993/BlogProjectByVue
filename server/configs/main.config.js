'use strict'

const path = require('path'),
  serverRoot = path.dirname(__dirname),
  root = path.resolve(serverRoot, '../'),
  staticDir = path.join(root, 'static'),
  dev = require('./dev.config.js'),
  dist = require('./dist.config.js'),
  fs = require('fs'),
  _ = require('lodash')

  // 默认生产环境
let config = {
  app: {
    name: 'blog',
    port: 3000,
    adminPath: '/api'
  },
  debug: false,
  env: 'production',
  // 配置数据库
  mongoConfig: {
    url: 'mongodb://localhost:27017/first-blog',
    opts: {
      user: '',
      pass: ''
    }
  },
  // JSON WEB TOKEN
  'jwt': {
    'cert': 'blog'
  },
  // 配置目录
  dir: {
    root,
    log: path.join(__dirname, '..', 'logs'),
    server: serverRoot,
    static: staticDir,
    resource: path.join(serverRoot, 'resource'),
    upload: path.join(serverRoot, 'resource', 'upload')
  }
}

// 本地调试环境
if (process.env.NODE_ENV === 'development') {
  config = _.merge(config, dev)
}

// 生产环境
if (process.env.NODE_ENV === 'production') {
  if (fs.existsSync(__dirname + '/dist.js')) {
    config = _.merge(config, dist)
  }
}

module.exports = config;
