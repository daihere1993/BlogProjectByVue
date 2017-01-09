module.exports = ({app}) => {
  const Article = M.article

  app.get('/api/articles', getArticleList)
  app.get('/api/articles/:id', getArticle)

  function getArticleList (req, res) {
    U.co(function* () {
      /**
       * @param page 文章列表页码 从1开始
       * @param limit 每页文章数量
       * */
      let skip
      const limit = parseInt(req.query.limit), articleList = [],
        page = req.query.page, sort = req.query.sort
      
      if (page === 0) {
        skip = 0
      } else {
        skip = limit * (page - 1)
      }

      let articles = yield Article.find({hidden: false})
        .populate('tag')
        .limit(limit).skip(skip)
        .sort(sort)

      if (articles.length) {
        articles.forEach((article, index) => {
          articleList.push(article)
        }) 
      }

      let count = yield Article.count()

      res.send({
        success: true,
        data: {
          articles: articleList,
          total: count
        }
      })
    }, res)
  }

  function getArticle (req, res) {
    U.co(function* () {
      const id = req.params.id

      if (!id.match(/^[0-9a-fA-F]{24}$/)){
        res.status(400).send({error: 'invalid id'})
      }

      const article = yield Article.findOne({_id: id, hidden: false})

      if (article) {
        let nextArticle = yield Article.findOne({_id: {$gt: article._id}}, '_id title')

        article.nextArticle = nextArticle

        let prevArticle = yield Article.findOne({_id: {$lt: article._id}}, '_id title').sort({_id: -1})

        article.prevArticle = prevArticle
        res.send({
          success: true,
          data: article
        })
      }
    })
  }
}

module.exports.getArticle = function (req, res) {
      
}
