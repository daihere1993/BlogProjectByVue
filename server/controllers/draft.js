const mongoose =require('mongoose'),
  Draft = mongoose.model('draft'),
  utils = require('../utils/utils')

module.exports.getDraftList = function (req, res) {
  const tag = this.tag,
    queryOpt = {}
  if (tag !== undefined) {
    queryOpt.tags = {'$all': [tag]}
  }
  Draft.find(queryOpt)
    .select('title tags createTime lastEditTime except article draftPublished')
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
          let draft = draftModel._doc.toObject()
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