import api from '../index.js'
export default {
  getAboutMe () {
    return api.get('me')
  },
  modifyAboutMe (content) {
    return api.patch('me', {content})
  }
}
