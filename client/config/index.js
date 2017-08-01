// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var rootPath = process.cwd();

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(rootPath, './dist/index.html'),
    assetsRoot: path.resolve(rootPath, './dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    proxyTable: {},
    assetsPublicPath: '/',
    assetsSubDirectory: 'static'
  }
}
