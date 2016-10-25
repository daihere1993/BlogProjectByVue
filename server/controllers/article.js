const utils = require('../utils/utils'),
  mongoose = require('mongoose'),
  Article = mongoose.model('article')

module.exports.getArticleList = function (req, res) {
  /**
   * @param page 文章列表页码 从1开始
   * @param limit 每页文章数量
   * */
  let skip
  const limit = parseInt(req.query.limit),
    page = req.query.page
  
  if (page === 0) {
    skip = 0
  } else {
    skip = limit * (page - 1)
  }

  Article.find({hidden: false})
    .populate('tag')
    .limit(limit).skip(skip).exec((err, articles) => {
      const articleList = []
      if (err) {
        utils.logger.error(err)
        this.throw(500,'内部错误')
      }
      if (articles.length) {
        articles.forEach((article, index) => {
          article = article.toObject()
          articleList.push(article)
        }) 
      }

      Article.count((err, count) => {
        if (err) {
          utils.logger.error(err)
          this.throw(500,'内部错误')
        }

        res.send({
          success: true,
          data: {
            articles: articleList,
            total: count
          }
        })
      })
    })
}

module.exports.getArticle = function (req, res) {
  const id = req.params.id
  if (!id.match(/^[0-9a-fA-F]{24}$/)){
    res.status(400).send({error: 'invalid id'})
  }
  
  Article.findOne({_id: id, hidden: false}, (err, article) => {
    if (err) {
      utils.logger.error(err)
      res.status(400).send({error: '内部错误'})
    }
    
    if (article) {
      article = article.toObject()
      Article.findOne({_id: {$gt: article._id}}, '_id title', (err, nextArticle) => {
        article.nextArticle = nextArticle
        Article.findOne({_id: {$lt: article._id}}, '_id title').sort({_id: -1}).exec((err, prevArticle) => {
          article.prevArticle = prevArticle
          res.send({
            success: true,
            data: article
          })
        })
      })
    }
  })
}
