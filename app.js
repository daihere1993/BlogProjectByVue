var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var MongoClient = require('mongodb').MongoClient
var mongoUrl = 'mongodb://localhost:27017/blog'
var ObjectId = require('mongodb').ObjectId
var _db

// 打印http记录
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static('dist'))

MongoClient.connect(mongoUrl, function (err, db) {
  if (err) {
    console.error(err)
    return
  }

  console.log('connect to mongo')
  _db = db
  app.listen(8888, function () {
    console.log('server is running...')
  })
})

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization, Access,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  if (res.method === 'OPTIONS') {
    res.rend(200)
  } else {
    next()
  }
})

app.get('/home', function (req, res, next) {
  var collection = _db.collection('notes')
  collection.find({}).toArray(function (err, result) {
    if (err) {
      console.error(err)
      return
    }

    res.json(result)
    next()
  })
})

app.get('/note/:id', function (req, res, next) {
  var _id = req.params.id
  var collection = _db.collection('notes')
  collection.findOne({_id: new ObjectId(_id)}).then(function (result) {
    res.json(result)
  })
  
})
