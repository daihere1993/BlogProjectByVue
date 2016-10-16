const mongoose =require('mongoose'),
  Draft = mongoose.model('draft'),
  utils = require('../utils/utils')

module.exports.getDraftList = function (req, res) {
  const tag = req.body.tag,
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
        this.throw(500, '内部错误')
      }
      const resultArr = []
      if (draftModels.length) {
        draftModels.forEach((draftModel) => {
          let draft = draftModel._doc
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
  const title = req.body.title || this.throw(400, '标题不能为空')
  const draft = new Draft({ title, article: null })

  draft.save().catch(err => {
    utils.logger.error(err)
    throw(new Error('文章创建失败'))
  })
  res.end(JSON.stringify({
    success: true,
    data: draft._doc
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
    this.body.draftPublished = false
    Draft.findByIdAndUpdate(id, {$set: req.body}, {new: true})
      .puplate('tags').exec((err, draftModel) => {
        if (err) {
          if (err.name === 'CastError') {
            this.throw(400, 'id不存在')
          } else {
            utils.logger.error(err)
            this.throw(500, '内部错误')
          }
        }

        const draft = draftModel._doc
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
        this.throw(500, '内部错误')
      }

      res.end(JSON.stringify({
        success: true,
        data: draftModel._doc
      }))
    })
}