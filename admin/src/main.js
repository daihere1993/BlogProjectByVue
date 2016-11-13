import './stylus/index.styl'
import Vue from 'vue'
import Alert from 'vue-alert-osd'
import adminComponent from './components/Admin.vue'
import { router } from './router.js'
import { date, md2text } from './filters'
require('font-awesome/css/font-awesome.min.css')
require('vue-alert-osd/lib/vue-alert.css')

Alert.set('duration', 3000)
window.alert = Alert
Vue.filter('md2Text', md2text)
Vue.filter('date', date)
router.start(adminComponent, '#app')
