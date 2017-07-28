const path = require('path'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

// 连接数据库
mongoose.connect(C.mongoConfig.url, C.mongoConfig.options)
console.log('connect: ' + C.mongoConfig.url + ' success!')
// 遍历所有model
U.forEachFilesByPath(path.join(__dirname, '..', '..', 'models'), {Schema}, (file, retModule) => {
  name = path.basename(file, '.js')
  M[name] = mongoose.model(name, new Schema(retModule))
})
