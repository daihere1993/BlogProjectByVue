const mongoose = require('mongoose'),
  Schema = mongoose.Schema
const articleSchema = new Schema({
  title: String,
  visits: {
    type: Number,
    default: 0
  },
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
  hidden: Boolean,
  excerpt: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
}, { versionKey: false, skipVersioning: {tags: true} })

articleSchema.set('toJSON', { getters: true, virtuals: true});
articleSchema.set('toObject', { getters: true, virtuals: true});
articleSchema.path('createTime').get(function (v) {
  return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
articleSchema.path('lastEditTime').get(function (v) {
  return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
const article =  mongoose.model('article', articleSchema);
module.exports = article;
