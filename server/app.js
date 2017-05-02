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
global.C = require('./config')
global.U = require('./utils')

// 处理跨域
if (global.C.env === 'development') {
  app.all('*', corsConfig)
}

function corsConfig (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization, Access,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,PATCH,OPTIONS')
  if (res.method === 'OPTIONS') {
    res.rend(200)
  } else {
    next()
  }
}

app.get('/', (req, res) => {
  return res.sendFile(process.cwd() + '/dist/index.html');
})

app.get('/admin', (req, res) => {
  return res.sendFile(process.cwd() + '/dist/admin.html');
})

// 打印http记录
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static('dist'))

// 初始化数据库以及各个模型
require(__dirname + '/models/except')
// 初始化各个控制器
U.forEachFilesByPath(__dirname + '/controllers', {app})

app.listen(C.app.port, () => {
  U.print('app is listening on port ' + C.app.port);
})
