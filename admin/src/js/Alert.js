const defaults = {
  title: '标题为定义',
  message: '显示信息为定义',
  type: ''
}

import Vue from 'vue'
import alert from '../components/Common/Alert.vue'

function merge (target) {
  var i, l, source, value

  for (i = 1, l = arguments.length; i < l; i++) {
    source = arguments[i]
    for (let prop in source) {
      value = source[prop]
      if (value !== undefined) {
        target[prop] = value
      }
    }
  }
  
  return target
}

var AlertConstructor = Vue.extend(alert), instance, Alert

function showWidget (params) {
  if (!instance) {
    initInstance()
  }

  if (!instance.visible) {
    const options = params.options

    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop]
      }
    }
    instance.$appendTo(document.body)

    Vue.nextTick(() => {
      instance.visible = true
    })
  }
}

function initInstance () {
  instance = new AlertConstructor({
    el: document.createElement('div')
  })
}

/**
 * options { title, message, type }
 */
Alert = function (options) {
  showWidget({
    options: merge({}, defaults, options)
  })
}

export default Alert
