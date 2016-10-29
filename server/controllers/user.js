module.exports = function ({app}) {
  const mongoose = require('mongoose'),
    md5 = require('md5'),
    jwt = require('jsonwebtoken'),
    cert = C.jwt.cert,
    User = M.user

  // 初始化user
  seed()
  app.post('/api/tokens', login)
  
  /**
   * 生成初始admin用户
   * 账号: admin
   * 密码: admin
   */
  function seed () {
    U.co(function* () {
      let user = yield User.find({})

      if (user.length === 0) {
        const user = new User({
          name: 'admin',
          username: 'admin',
          password: md5('admin').toUpperCase(),
          avatar: '',
          createTime: new Date()
        })
        user.save().catch(err => {
          U.logger.error(err)
          throw(new Error('数据seed失败, 请debug后重新启动'))
        })
      }
    })
  }
  
  function login (req, res) {
    U.co(function* () {
      const username = req.body.username,
        password = req.body.password
      let user = yield User.findOne({username: username})

      user = user && user.toObject()
      if (user !== null) {
        if (user.password === password) {
          const token = jwt.sign({
            uid: user._id,
            name: user.name,
            exp: Math.floor(Date.now()/1000) + 24 * 60 * 60 // 一小时
          }, cert)
          U.print(token)
          res.writeHead(200, {'Content-type': 'application/json'})
          res.end(JSON.stringify({
            uid: user._id,
            name: user.name,
            token
          }))
        } else {
          res.status(400).send({ error: '密码错误' })
        }
      } else {
        res.status(401).send({ error: '用户名错误' })
      }
    }, res)
  }
}
