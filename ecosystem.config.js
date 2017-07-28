module.exports = {
  apps: [{
    name: 'app',
    script: './server/app.js',
    watch: true,
    env: {
      'NODE_ENV': 'production'
    }
  }]
}