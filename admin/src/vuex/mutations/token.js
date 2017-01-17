import { TOKEN_CREATE, TOKEN_DELETE } from '../mutation_types'

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

export default mutations