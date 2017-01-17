import actions from '../actions/token'
import mutations from '../mutations/token'
import getters from '../getters/token'

const state = {
  token: window.sessionStorage.getItem('token')
}

export default {
  state,
  mutations,
  actions,
  getters
}
