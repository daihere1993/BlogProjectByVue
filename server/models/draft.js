module.exports = ({Schema}) => ({
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
})
