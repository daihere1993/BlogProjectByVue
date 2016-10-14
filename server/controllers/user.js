const mongoose = require('mongoose'),
  configs = require("../configs/main.config"),
  utils = require('../utils/utils')
  md5 = require('md5'),
  jwt = require('jsonwebtoken')

const cert = configs.jwt.cert
const User = mongoose.model('user')
/**
 * 生成初始admin用户
 * 账号: admin
 * 密码: admin
 */
exports.seed = function () {
  User.find({}, function (err, userModels) {
    if (userModels.length === 0) {
      user = new User({
        name: 'admin',
        username: 'admin',
        password: md5('admin').toUpperCase(),
        avatar: '',
        createTime: new Date()
      })
      user.save().catch(err => {
        utils.logger.error(err)
        thorw(new Error('数据seed失败, 请debug后重新启动'))
      })
    }
  })
  
}

exports.create = function (req, res) {
  const username = req.body.username,
    password = req.body.password
  User.findOne({username: username}, function (err, userModel) {
    let user = userModel._doc
    if (user !== null) {
      if (user.password === password) {
        const token = jwt.sign({
          uid: user._id,
          name: user.name,
          exp: Math.floor(Date.now()/1000) + 24 * 60 * 60 // 一小时
        }, cert)
        utils.print(token)
        res.send(JSON.stringify({
          uid: user._id,
          name: user.name,
          token
        }))
      } else {
        this.throw(401, '密码错误')
      }
    } else {
      this.throw(401, '用户名错误')
    }
  })
}
