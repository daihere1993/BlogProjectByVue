const mongoose = require('mongoose'),
  Schema = mongoose.Schema
const meSchema = new Schema({
  content: String
}, { versionkey: false })
const me = mongoose.model('me', meSchema)
module.exports = me