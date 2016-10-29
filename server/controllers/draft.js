module.exports = ({app}) => {
  const Draft = M.draft
  
  app.get('/api/drafts', getDraftList)
  app.post('/api/drafts', create)
  app.get('/api/drafts/:id', getDraftById)
  app.patch('/api/drafts/:id', modify)

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
        drafts.forEach((draftModel) => {
          let draft = draftModel.toObject()
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
      
      res.end({
        success: true,
        data: draftModel.toObject()
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
      res.end({
        success: true,
        data: draft
      })
    }, res)
  }
}
