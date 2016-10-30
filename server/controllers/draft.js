module.exports = ({app}) => {
  const Draft = M.draft
  
  app.get('/api/drafts', getDraftList)
  app.post('/api/drafts', create)
  app.get('/api/drafts/:id', getDraftById)
  app.patch('/api/drafts/:id', modify)
  app.delete('/api/drafts/:id', deleteDraft)

  function getDraftList (req, res) {
    U.co(function* () {
      const tag = req.query.tag,
        queryOpt = {}
      if (tag !== undefined) {
        queryOpt.tags = {'$all': [tag]}
      }
      let drafts = yield Draft.find(queryOpt)
        .select('title tags createTime lastEditTime excerpt article draftPublished')
        .populate('tags')
        .sort({ lastEditTime: -1 })

      const draftList = []
      if (drafts.length) {
        drafts.forEach((draft) => {
          draftList.push(draft)
        })
      }
      res.send({
        success: true,
        data: draftList
      })
    }, res)
  }

  function create (req, res) {
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
      U.logger.error(err)
      throw(new Error('文章创建失败'))
    })
    res.send({
      success: true,
      data: draft.toObject()
    })
  }

  function getDraftById (req, res) {
    U.co(function* () {
      const id = req.params.id
    
      let draft = yield Draft.findOne({_id: id})
        .populate('tags')
        .select('title tags createTime lastEditTime excerpt article draftPublished content')
      
      res.send({
        success: true,
        data: draft
      })
    })
  }

  function modify (req, res) {
    U.co(function* () {
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

      let draft = yield Draft.findByIdAndUpdate(id, {$set: req.body}, {new: true}).populate('tags')
      res.send({
        success: true,
        data: draft
      })
    }, res)
  }

  function deleteDraft (req, res) {
    U.co(function* () {
      const id = req.params.id;
      const draft = yield Draft.findOne({_id: id})
        .select('article')
        .exec().catch(err => {
          res.status(400).send({error: '内部报错'})
        })
      //如果该草稿已经发布为文章,则改草稿不能删除,
      //因为草稿是查看其对应的文章的入口
      //功能上只提供把已发布的文章隐藏
      //和未发布为文章的草稿删除
      if(draft === null){
        res.status(400).send({error: 'id不存在'})
        return
      }
      if(draft.article !== null){
        res.status(403).send({error: '已发布文章的草稿不能删除'})
      }
      const result = yield Draft.remove({_id: id})
      res.send({
        success: true
      })
    }, res)
  }
}
