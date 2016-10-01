'use strict'
const config = require('./configs/main.config')

const express = require('express'),
  app = express(),
  co = require('co'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  cors = require('express-cors'),
  jwt = require('jsonwebtoken'),
  mongoose = require('mongoose'),
  controllers = require('./controllers/main.js'),
  utils = require('./utils/utils.js')

co(function* () {
  // 打印http记录
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(express.static('dist'))
  // 处理跨域情况
  app.use(cors({
    // 请求头的有效期为7天
    maxAge: 7 * 24 * 60 * 60,
    methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
    headers: 'Content-Type, Accept, Authorization'
  }))
  mongoose.connect(config.mongoConfig.url, config.mongoConfig.opts)
  yield controllers.init(app)
  app.listen(config.app.port, () => {
    utils.print('app is listening on port ' + config.app.port)
  })
}).catch((err) => {
  utiles.print(err.stack)
}) 
