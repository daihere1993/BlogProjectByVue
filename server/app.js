const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  util = require('util'),
	fs = require('fs'),
  formidable = require('formidable')

/**
 * 全局变量
 * M 数据model
 * C 配置config
 * U utils
 */
global.M = {}
global.C = require('./config')
global.U = require('./utils')

// 处理跨域
if (global.C.env === 'development') {
  app.all('*', corsConfig)
}

function corsConfig (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization, Access,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,PATCH,OPTIONS')
  if (res.method === 'OPTIONS') {
    res.rend(200)
  } else {
    next()
  }
}

app.get('/', (req, res) => {
  return res.sendFile(process.cwd() + '/dist/index.html');
})

app.get('/admin', (req, res) => {
  return res.sendFile(process.cwd() + '/dist/admin.html');
})

app.post('/api/upload', (req, res) => {
	let relativeImageUrl = '/dist/static/upload/images/';
  let form = new formidable.IncomingForm();
  form.uploadDir = process.cwd() + relativeImageUrl;
  form.encoding = 'utf-8';
  form.parse(req, function(err, fields, files) {
    if (err) {
			res.json({
				status: 500,
				msg: err.message
			})
			return false
		}

		let imgUrls = [];

		let imgs = files.imgs;
		for (let key in files) {
			let extName = '', img = files[key];

			switch (img.type) {
				case 'image/pjpeg':
					extName = 'jpg'
					break
				case 'image/jpeg':
					extName = 'jpg'
					break
				case 'image/png':
					extName = 'png'
					break
				case 'image/x-png':
					extName = 'png'
					break
			}
			if (extName.length === 0) {
				res.json({
					status: 500,
					msg: '只支持png和jpg格式图片'
				})
				return false
			}
			let imgName = 'upload_img_' + new Date().getTime() + '.' + extName;
			let imgUrl = form.uploadDir + imgName;
			fs.renameSync(img.path, imgUrl);
			imgUrls.push('static/upload/images/' + imgName);
		}

		res.json({
			status: 200,
			success: true,
			urls: imgUrls
		});
  });
  return;
})

// 打印http记录
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static('dist'))

// 初始化数据库以及各个模型
require(__dirname + '/models/except')
// 初始化各个控制器
U.forEachFilesByPath(__dirname + '/controllers', {app})

app.listen(C.app.port, () => {
  U.print('app is listening on port ' + C.app.port);
})
