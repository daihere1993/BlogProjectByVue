import Vue from 'vue'
import App from './App'
import './style/common.css'
import './style/post.css'
import Home from './components/Home.vue'
import Note from './components/Note.vue'
import VueMoment from 'vue-moment'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueMoment)

const router = new VueRouter()

router.map({
  '/home': {
    component: Home
  },
  '/note/:id': {
    component: Note
  }
})

router.redirect({
  '*': '/home'
})

router.start(App, '#app')
