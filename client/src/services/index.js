/* 封装fetch */
function parseResponse (response) {
  return Promise.all([response.status,response.statusText, response.json()])
}

function checkStatus ([status,statusText,data]) {
  if (status >= 200 && status < 300){
    return data
  } else {
    let error = new Error(statusText)
    error.status = status
    error.error_message = data
    return Promise.reject(error)
  }
}

function _formatterParamToString (param, preKey) {
  var query = [], key;
  for (key in param) {
    if (param[key] instanceof Object) {
      console.log(_formatterParamToString(param[key], key));
      query = query.concat(_formatterParamToString(param[key], key))
    } else {
      if (preKey) {
        query.push(`${preKey}[${key}]=${encodeURIComponent(param[key])}`)  
      } else {
        query.push(`${key}=${encodeURIComponent(param[key])}`)
      }
    }
  }
  return query
}



export default{
  get (url, param = {}, headers = {}, host = process.env.api) {

    let reqHeaders = new Headers()
    reqHeaders.append('Accept', 'application/json')
    // console.log(param)
    // Object.keys(param).forEach((item, a) => {
    //   console.log(item)
    //   console.log(a)
    //   query.push(`${item}=${encodeURIComponent(param[item])}`)
    // })
    var query = _formatterParamToString(param)
    var params = query.length ? '?' + query.join('&') : ''  // fixme
    url = host + url + params
    console.log(host, params)
    var init = {
      method: 'GET',
      headers: reqHeaders,
      cache: 'default',
      mode: 'cors'
    }
    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  patch (url, param = {}, headers = {}, host = process.env.api) {
    let reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')

    url = host + url

    var init = {
      method: 'PATCH',
      headers: reqHeaders,
      mode: 'cors',
      body: JSON.stringify(param)
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  post (url, param = {}, headers = {}, host = process.env.api) {
    let reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')

    url = host + url
    var init = {
      method: 'POST',
      headers: reqHeaders,
      mode: 'cors',
      body: JSON.stringify(param)
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  put (url, param = {}, headers = {}, host = process.env.api) {
    let reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')

    url = host + url

    var init = {
      method: 'PUT',
      headers: reqHeaders,
      mode:'cors',
      body: JSON.stringify(param)
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  },
  delete (url, param = {}, headers = {}, host = process.env.api) {
    let reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')

    url = host + url

    var init = {
      method: 'DELETE',
      headers: reqHeaders,
      mode: 'cors'
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  }

}
