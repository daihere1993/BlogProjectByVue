const mongoose = require('mongoose'),
  utils = require('../utils/utils'),
  Tag = mongoose.model('tag'),
  Article = mongoose.model('article'),
  Draft = mongoose.model('draft')

module.exports.getTags = function (req, res) {
  const keyword = req.body.keyword,
    queryOption= {}

  if (keyword) {
    queryOption.name = {$regex: '^' + keyword}
  }
  Tag.find(queryOption, (err, tags) => {
    if (err) {
      utils.logger.error(err)
      res.statue(500).send({ error: '内部错误' })
    }

    res.send({
      success: true,
      data: tags
    })
  })
}

module.exports.create = function (req, res) {
  const tagName = req.body.name

  Tag.findOne({name: tagName}, (err, tag) => {
    if (err) {
      utils.logger.error(err)
      res.statue(500).send({ error: '内部错误' })
    }
    if (tag !== null) {
      res.send({
        success: true,
        data: tag
      })
    } else {
      const newTag = new Tag({
        name: tagName
      })
      newTag.save(function (err, tag) {
        if (err) {
          utils.logger.error(err)
          res.statue(500).send({ error: '内部错误' })
        }
        res.send({
          success: true,
          data: tag.toObject()
        })
      })
    }
  })
}
