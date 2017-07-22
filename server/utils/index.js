'use strict'
const Logger = require('mini-logger'),
  validator = require('validator'),
  config = require('../config'),
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
    },
    fsExistSync: function (path) {
      try {
        fs.accessSync(path);
      } catch (error) {
        return false;
      }
      return true;
    },
    // 暂时只支持path是绝对路径的情况
    fsMkdirSync: function (path) {
      const paths = path.split('/');
      
      path = '';
      paths.forEach((path_str) => {
        if (path_str) {
          path += path_str;
          if (!this.fsExistSync(path)) {
            fs.mkdirSync(path);
          }
        }
        path += '/';
      })
    }
  }

module.exports = utils
