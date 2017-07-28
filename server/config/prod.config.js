module.exports = {
  env: 'production',
  debug: true,
  mongoConfig: {
    opts: {
      user: '',
      pass: ''
    }
  },
  'jwt': {
    'cert': 'blog-dist'
  }
}
