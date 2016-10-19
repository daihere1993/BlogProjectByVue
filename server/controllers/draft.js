const mongoose =require('mongoose'),
  Draft = mongoose.model('draft'),
  utils = require('../utils/utils')

module.exports.getDraftList = function (req, res) {
  const tag = req.query.tag,
    queryOpt = {}
  if (tag !== undefined) {
    queryOpt.tags = {'$all': [tag]}
  }
  Draft.find(queryOpt)
    .select('title tags createTime lastEditTime excerpt article draftPublished')
    .populate('tags')
    .sort({ lastEditTime: -1 })
    .exec((err, draftModels) => {
      if (err) {
        utils.logger.error(err)
        res.status(500).send({ error: '内部错误' })
      }
      const resultArr = []
      if (draftModels.length) {
        draftModels.forEach((draftModel) => {
          let draft = draftModel.toObject()
          resultArr.push(draft)
        })
      }
      res.writeHead(200, {'Content-type': 'application/json'})
      res.end(JSON.stringify({
        success: true,
        data: resultArr
      }))
    })
}

module.exports.create = function (req, res) {
  const title = req.body.title || res.status(400).send({ error: '标题不能为空' })
  const draft = new Draft({ 
    title,
    createTime: new Date(),
    lastEditTime: new Date(),
    excerpt: '',
    content: '',
    article: null,
    draftPublished: false
  })

  draft.save().catch(err => {
    utils.logger.error(err)
    throw(new Error('文章创建失败'))
  })
  res.end(JSON.stringify({
    success: true,
    data: draft.toObject()
  }))
} 

module.exports.modify = function (req, res) {
  const id = req.params.id,
    content = req.body.content

    if (content) {
      const contentArr = content.split('<!-- more -->')
      if (contentArr.length > 1) {
        req.body.excerpt = contentArr[0]
      } else {
        req.body.excerpt = ''
      }
    } 
    req.body.lastEditTime = new Date()
    req.body.draftPublished = false
    Draft.findByIdAndUpdate(id, {$set: req.body}, {new: true})
      .populate('tags').exec((err, draftModel) => {
        if (err) {
          if (err.name === 'CastError') {
            res.status(400).send({ error: 'id不存在' })
          } else {
            utils.logger.error(err)
            res.status(500).send({ error: '内部错误' })
          }
        }

        const draft = draftModel.toObject()
        res.end(JSON.stringify({
          success: true,
          data: draft
        }))
      })
}

module.exports.getDraftById = function (req, res) {
  const id = req.params.id
  
  Draft.findOne({_id: id})
    .populate('tags')
    .select('title tags createTime lastEditTime excerpt article draftPublished content')
    .exec((err, draftModel) => {
      if (err) {
        utils.logger.error(err)
        res.status(500).send({ error: '内部错误' })
      }

      res.end(JSON.stringify({
        success: true,
        data: draftModel.toObject()
      }))
    })
}
