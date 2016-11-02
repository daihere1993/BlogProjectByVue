import api from '../index.js'
export default {
  getPost (id) {
    return api.get(`articles/${id}`)
  }
}
