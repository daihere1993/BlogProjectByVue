import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/logger'
import modules from './modules'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules
})
