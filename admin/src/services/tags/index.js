import api from '../index.js'
export default {
  getAllTags () {
    return api.get('tags')
  },
  modifyTag (id, name) {
    return api.patch('tags/' + id, {name})
  },
  deleteTag (id) {
    return api.delete('tags/' + id)
  }
}
