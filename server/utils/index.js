'use strict'
const Logger = require('mini-logger'),
  validator = require('validator'),
  config = require('../configs'),
  print = require('debug')('blog'),
  fs = require('fs'),
  co = require('co'),
  utils = {
    // debug plugin
    print: print,
    // data validator
    validator: validator,
    // log 记录 用法: utils.error(new Error(''))
    logger: Logger({
      dir: config.dir.log,
      format: 'YYYY-MM-DD-[{category}][.log]'
    }),
    // 遍历指定路径下的指定类型文件
    forEachFilesByPath: function (path, params, exceptFn) {
      fs.readdirSync(path)
        .forEach(file => {
          const newPath = path + '/' + file
          const stat = fs.statSync(newPath)

          if (stat.isFile()) {
            if (/(.*)\.(js)/.test(file)) {
              const ret_module = require(newPath)(params)
              exceptFn && exceptFn(file, ret_module)
            }
          } else if (stat.isDirectory() && file !== 'except') {
            this.forEachFilesByPath(newPath)
          }
        })
    },
    // wrap co
    co: function (success, res) {
      co(success).catch({function (err) {
        //统一服务报错处理
        res && res.status(500).send({ error: "服务器内部错误" })
      }})
    }
  }

module.exports = utils

// 时间格式化函数
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,                 //月份
    'd+': this.getDate(),                    //日
    'h+': this.getHours(),                   //小时
    'm+': this.getMinutes(),                 //分
    's+': this.getSeconds(),                 //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  return fmt;
}
