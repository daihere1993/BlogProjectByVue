const token = require('./token.js')

module.exports.init = function* (app) {
  yield token.init(app)
}
