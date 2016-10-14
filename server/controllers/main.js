exports.corsConfig = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization, Access,X-Requested-With')
  if (res.method === 'OPTIONS') {
    res.rend(200)
  } else {
    next()
  }
}
