const utils = require('../utils/utils'),
  mongoose = require('mongoose'),
  Draft = mongoose.model('draft'),
  Article = mongoose.model('article')

  module.exports.create = function (req, res) {
    const draftId = req.body.draftId

    Draft.findOne({_id: draftId}, (err, draft) => {
      if (err) {
        utils.logger.error(err)
        throw(500, '内部错误')
      }

      if (!draft.title) {
        throw(400, '文章标题不能为空')
      } else if (!draft.excerpt) {
        // throw(400, '文章摘要不能为空, 请在文章中插入\'<!-- more -->\'以分隔摘要和正文')
        res.status(400).send({ error: '文章摘要不能为空, 请在文章中插入\'<!-- more -->\'以分隔摘要和正文' })
      } else if (!draft.content) {
        throw(400, '文章内容不能为空')
      }
      if (draft.article !== null) {
        draft.draftPublished = true;
        draft.lastEditTime = new Date();
        const articleOption = draft.toObject();
        delete articleOption._id;
        delete articleOption.draftPublished;
        delete articleOption.article;
        delete articleOption.createTime;
        draft.save().catch(err => {
          utils.logger.error(err);
          throw(500,'内部错误')
        })
        Article.findByIdAndUpdate(draft.article,{$set:articleOption},{new:true})
          .populate('tags').exec((err, article) => {
            if (err) {
              if(err.name === 'CastError'){
                throw(400,'article id 不存在')
              }else{
                utils.logger.error(err)
                throw(500,'内部错误')
              }
            }
            article = article.toObject()
            res.end(JSON.stringify({
              success:true,
              data:{
                article
              }
            }))
          })
      } else {
        draft.draftPublished = true
        draft.lastEditTime = new Date()
        const articleOption = draft.toObject()
        delete articleOption._id
        delete articleOption.id
        delete articleOption.draftPublished
        delete articleOption.article
        articleOption.createTime = articleOption.lastEditTime
        delete articleOption.lastEditTime
        articleOption.visits = 0
        articleOption.comments = []
        articleOption.hidden = false
        let article = new Article(articleOption)
        article.save().catch(err => {
          utils.logger.error(err)
          throw(500,'内部错误')
        })
        draft.article = article._id
        draft.save().catch(err => {
          utils.logger.error(err)
          throw(500,'内部错误')
        });
        article = article.toObject()
        res.end(JSON.stringify({
          success:true,
          data:{article}
        }))
      }
    })
  }
