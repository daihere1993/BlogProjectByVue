const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  morgan = require('morgan')

/**
 * 全局变量
 * M 数据model
 * C 配置config
 * U utils
 */
global.M = {}
global.C = require('./configs')
global.U = require('./utils')

// 初始化数据库以及各个模型
require(__dirname + '/models/except')
// 初始化各个控制器
U.forEachFilesByPath(__dirname + '/controllers', {app})

// 打印http记录
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static('dist'))

app.listen(C.app.port, () => {
  U.print('app is listening on port ' + C.app.port);
})
