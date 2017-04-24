module.exports = {
  env: 'production',
  debug: true,
  mongoConfig: {
    url: 'mongodb://localhost:27017/first-blog-dist',
    opts: {
      user: '',
      pass: ''
    }
  },
  'jwt': {
    'cert': 'blog-dist'
  }
}
