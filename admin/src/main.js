import './stylus/index.styl'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Alert from 'vue-alert-osd'
import admin from './components/Admin.vue'
import routes from './routes'
import { date } from './filters'
import 'font-awesome/css/font-awesome.min.css'
import 'vue-alert-osd/lib/vue-alert-osd.min.css'

Vue.use(VueRouter)
const router = new VueRouter({
  routes,
})

router.beforeEach( (to, from, next, redirect) => {
  // console.log(store.state.token.token)
  if (to.name !== 'login') {
    if (store.state.token.token === null) {
      next('/login')
    } else {
      next()
    }
  } else {
    // login页
    if (store.state.token.token === null) {
      next()
    } else {
      if (from.path !== undefined) {
        next('/' + from.path)
      } else {
        next('/posts')
      }
    }
  }
})

Alert.set('duration', 3000)
window.alert = Alert
Vue.filter('date', date)

/* eslint-disable no-new */
new Vue({
  template: '<admin></admin>',
  components: { admin },
  router
}).$mount('#app')
