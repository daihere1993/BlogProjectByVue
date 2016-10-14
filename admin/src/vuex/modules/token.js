/**
 * Created by chuck7 on 16/9/20.
 */
import {
  TOKEN_CREATE,
  TOKEN_DELETE
}from '../mutation_types'

const state = {
  token: window.sessionStorage.getItem('token')
}
const mutations = {
  [TOKEN_CREATE] (state, token) {
    state.token = token
    window.sessionStorage.setItem('token', token)
  },
  [TOKEN_DELETE] (state) {
    window.sessionStorage.removeItem('token')
    state.token = null
  }
}
export default {
  state,
  mutations
}
