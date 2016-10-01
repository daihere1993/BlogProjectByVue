'use strict'
const jwt = require('jsonwebtoken'),
  config = require('../configs/main.config.js'),
  md5 = require('md5')
const cert = config.jwt.cert
const User = require('../models/user.js')
module.exports.init = function* (app) {
  yield seed
  app.post('/tokens', create)
}

/**
 * 生成初始admin用户
 * 账号: admin
 * 密码: admin
 */
function * seed () {
  let user = yield User.find().exec().catch(err => {
    utils.logger.error(err)
    throw(new Error('数据seed失败, 请debug后重新启动'))
  })
  if (user.length === 0) {
    user = new User({
      name: 'admin',
      username: 'admin',
      password: md5('admin').toUpperCase(),
      avatar: '',
      createTime: new Date()
    })
    yield user.save().catch(err => {
      utils.logger.error(err)
      thorw(new Error('数据seed失败, 请debug后重新启动'))
    })
  }
}

function* create (next) {
  const username = this.request.body.username,
    password = this.request.body.password
  let user = yield User.findOne({username}).exec()
  if (user !== null) {
    if (user.password === password) {
      const token = jwt.sign({
        uid: user._id,
        name: user.name,
        exp: Math.floor(Date.now()/1000) + 24 * 60 * 60 // 一小时
      }, cert)
      utils.print(token)
      this.status = 200
      this.body = {
        success: true,
        data: {
          uid: user._id,
          name: user.name,
          token
        }
      }
    } else {
      this.throw(401, '密码错误')
    }
  } else {
    this.throw(401, '用户名错误')
  }
}
