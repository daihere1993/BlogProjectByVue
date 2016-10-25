'use strict'
const config = require('./configs/main.config')

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  cors = require('express-cors'),
  jwt = require('jsonwebtoken'),
  mongoose = require('mongoose'),
  utils = require('./utils/utils.js')

// 连接数据库
mongoose.connect(config.mongoConfig.url, config.mongoConfig.opts)

// 初始化各个模型
utils.forEachFilesByPath(__dirname + '/models')

const MainCtrl = require('./controllers/main')
const User = require('./controllers/user')
const Draft = require('./controllers/draft')
const Publication = require('./controllers/publication')
const Tag = require('./controllers/tag')
const Me = require('./controllers/me')
const Article = require('./controllers/article')

// 初始化user
User.seed()
// 初始化me
Me.seed()

// 打印http记录
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static('dist'))

app.all('*', MainCtrl.corsConfig)
app.post('/api/tokens', User.create)
app.get('/api/drafts', Draft.getDraftList)
app.post('/api/drafts', Draft.create)
app.get('/api/drafts/:id', Draft.getDraftById)
app.patch('/api/drafts/:id', Draft.modify)
app.post('/api/publications', Publication.create)
app.get('/api/tags', Tag.getTags)
app.post('/api/tags', Tag.create)
app.get('/api/me', Me.get)
app.patch('/api/me', Me.save)
app.get('/api/articles', Article.getArticleList)
app.listen(config.app.port, () => {
  utils.print('app is listening on port ' + config.app.port);
})
