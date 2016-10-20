const mongoose = require('mongoose'),
  Me = mongoose.model('me'),
  utils = require('../utils/utils')

module.exports.seed = function () {
  Me.find({}, (err, mes) => {
    if (mes.length === 0) {
      me = new Me({ content: '少点欲望，多点理想' })
      me.save().catch(err => {
        utils.logger.error(err)
        throw(new error('Me seed fail'))
      })
    }
  })
}

module.exports.get = function (req, res) {
  Me.find({}, (err, mes) => {
    if (err) {
      utils.logger.error(err)
      res.status(500).send({ error: '内部错误' })
    }
    if (mes.length > 0) {
      res.send({
        success: true,
        data: mes[0].toObject()
      })
    }
  })
}

module.exports.save = function (req, res) {
  const content = req.body.content

  Me.findOneAndUpdate({}, {content}, (err, me) => {
    if (err) {
      utils.logger.error(err)
      res.status(500).send({ error: '内部错误' })
    }

    res.send({
      success: true,
      data: me && me.toObject()
    })
  })
}
