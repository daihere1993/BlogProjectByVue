import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Blog from './Blog'
import { date } from './filters/index'
import './stylus/index.styl'

Vue.use(VueRouter)
Vue.filter('date', date)

const router = new VueRouter({routes})

/* eslint-disable no-new */
new Vue({
  template: '<blog></blog>',
  components: { Blog },
  router
}).$mount('#app')
