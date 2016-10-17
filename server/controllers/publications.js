const utils = require('../utils/utils'),
  mongoose = require('mongoose'),
  Draft = mongoose.model('draft'),
  Article = mongoose.model('article')

  module.exports.create = function (req, res) {
    const draftId = req.body.draftId

    // Draft.findOne({_id: draftId}, (err, draftModel) => {
    //   if (err) {
    //     utils.logger.error(err)
    //     this.throw(500, '内部错误')
    //   }

    //   const draft = draftModel.toObject()
    //   if (!draft.title) {
    //     this.throw(400, '文章标题不能为空')
    //   } else if (!draft.excerpt) {
    //     this.throw(400, '文章摘要不能为空, 请在文章中插入\'<!-- more -->\'以分隔摘要和正文')
    //   } else if (!draft.content) {
    //     this.throw(400, '文章内容不能为空')
    //   }
    //   if (draft.article !== null) {
    //     draft.draftPublished = true
    //     draft.lastEditTime = new Date()
    //     delete draft._id;
    //     delete draft.draftPublished;
    //     delete draft.article;
    //     delete draft.createTime;
    //   } 
    // })

  }
