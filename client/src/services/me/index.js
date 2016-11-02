import api from '../index.js'
export default {
  getAboutMe () {
    return api.get('me');
  }
}
