import './stylus/index.styl'
import Vue from 'vue'
import MessageBox from 'vue-msgbox'
import adminComponent from './components/Admin.vue'
import { router } from './router.js'
import { date, md2text } from './filters'

require('font-awesome/css/font-awesome.min.css')

window.alert = MessageBox
Vue.filter('md2Text', md2text)
Vue.filter('date', date)
router.start(adminComponent, '#app')
