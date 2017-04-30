module.exports = {
  apps: [{
    name: 'app',
    script: './server/app.js',
    watch: true,
    env_production: {
      'NODE_ENV': 'production'
    }
  }]
}