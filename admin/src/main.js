import './stylus/index.styl'
import Vue from 'vue'
import MessageBox from 'vue-msgbox'
import adminComponent from './components/Admin.vue'
import { router } from './router.js'
import md2Text from './filters/md2Text'

// require('font-awesome/css/font-awesome.min.css')

window.alert = MessageBox
window.alert = MessageBox
Vue.filter('md2Text', md2Text)
router.start(adminComponent, '#app')
