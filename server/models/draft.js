const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const draftSchema = new Schema({
  title: String,
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'tag'
  }],
  createTime: {
    type: Date,
    default: Date.now
  },
  lastEditTime: {
    type: Date,
    default: Date.now
  },
  excerpt: String,
  content: String,
  article: {
    type: Schema.Types.ObjectId,
    reg: 'tag'
  },
  draftPublished: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false,
  skipVersioning: {tags: true}
})

draftSchema.set('toJSON', { getters: true, virtuals: true})
draftSchema.set('toObject', { getters: true, virtuals: true})
draftSchema.path('createTime').get(function (v) {
  return new Date(v).format('yyyy-MM-dd hh:mm:ss')
})
draftSchema.path('lastEditTime').get(function (v) {
  return new Date(v).format('yyyy-MM-dd hh:mm:ss')
})
const draft =  mongoose.model('draft', draftSchema)
module.exports = draft
