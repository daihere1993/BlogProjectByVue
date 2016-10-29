module.exports = ({app}) => {
  const Me = M.me

  app.get('/api/me', get)
  app.patch('/api/me', save)

  // 初始化me
  seed()

  function seed () {
    U.co(function* () {
      let mes = yield Me.find({})

      if (mes.length === 0) {
        me = new Me({ content: '少点欲望，多点理想' })
        me.save().catch(err => {
          utils.logger.error(err)
          throw(new error('Me seed fail'))
        })
      }
    })
  }
  
  function get (req, res) {
    U.co(function* () {
      let mes = yield Me.find({})

      if (mes.length > 0) {
        res.send({
          success: true,
          data: mes[0]
        })
      }
    }, res)
  }

  function save (req, res) {
    U.co(function* () {
      const content = req.body.content
      let me = Me.findOneAndUpdate({}, {content})

      res.send({
        success: true,
        data: me
      })
    }, res)
  }
}
