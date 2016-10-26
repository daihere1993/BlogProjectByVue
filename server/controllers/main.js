exports.corsConfig = function (req, res, next) {
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
