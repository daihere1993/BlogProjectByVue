module.exports = ({app}) => {
  const Draft = M.draft,
    Article = M.article
  
app.post('/api/publications', create)

 function create (req, res) {
   U.co(function* () {
     const draftId = req.body.draftId

      let draft = yield Draft.findOne({_id: draftId})

      if (!draft.title) {
        res.status(400).send({ error: '文章标题不能为空' })
      } else if (!draft.excerpt) {
        res.status(400).send({ error: '文章摘要不能为空, 请在文章中插入\'<!-- more -->\'以分隔摘要和正文' })
      } else if (!draft.content) {
        res.status(400).send({ error: '文章内容不能为空' })
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
          U.logger.error(err);
          throw(500,'内部错误')
        })
        let article = yield Article.findByIdAndUpdate(draft.article,{$set:articleOption},{new:true})
          .populate('tags')

        res.send({
          success:true,
          data:{
            article
          }
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
        res.send({
          success:true,
          data:{article}
        })
      }
   })
 }  
}
