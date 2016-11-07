module.exports = ({app}) => {
  const Article = M.article,
    Draft = M.draft,
    Tag = M.tag

  app.get('/api/tags', getTags)
  app.post('/api/tags', create)
  app.delete('/api/tags', deleteTag)

  function getTags (req, res) {
    U.co(function* () {
      const keyword = req.query.keyword,
        queryOption= {}

      if (keyword) {
        queryOption.name = {$regex: '^' + keyword}
      }
      let tags = yield Tag.find(queryOption)
      res.send({
        success: true,
        data: tags
      })
    }, res)
  }

  function create (req, res) {
    U.co(function* () {
      const tagName = req.body.name

      let tag = yield Tag.findOne({name: tagName})

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
            data: tag
          })
        })
        }
    }, res)
  }

  function deleteTag (req, res) {
    U.co(function* () {
      const tag_id = req.params.id
      yield [
        Draft.update({}, {$pull: {tags: id}}).exec().catch(err => {
          utils.logger.error(err)
          res.statue(500).send({ error: '内部错误' })
        }),
        Article.update({}, {$pull: {tags: id}}).exec().catch(err => {
          utils.logger.error(err)
          res.statue(500).send({ error: '内部错误' })
        }),
        Tag.remove({_id: id}).exec().catch(err => {
          utils.logger.error(err)
          res.statue(500).send({ error: '内部错误' })
        })
      ]

      res.send({
        success: true
      })

    })
  }
}
