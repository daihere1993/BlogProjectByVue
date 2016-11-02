import api from '../index.js'
export default {
  getPostList (params) {
    return api.get('articles', params)
  }
}
