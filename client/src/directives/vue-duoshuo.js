import Vue from 'vue'
export default Vue.directive('duoshuo', {
  bind() {
    // 准备工作
    // 例如，添加事件处理器或只需要运行一次的高耗任务
  },
  update(ele, option) {
    // 值更新时的工作
    // 也会以初始值为参数调用一次
    if (option.value.id !== undefined) {
      ele.innerHTML = ``
      window.duoshuoQuery.sso = {
        login : '#!/posts/' + option.value.id,
        logout:process.env.index + '#!/posts/' + option.value.id
      }
      let dom = document.createElement('div')
      dom.setAttribute('data-thread-key', option.value.id)
      dom.setAttribute('data-title', option.value.title)
      dom.setAttribute('data-url', process.env.index + '#!/posts/' + option.value.id)
      
      _duoshuoInit(dom, ele)
    }
  },
  unbind() {
    // 清理工作
    // 例如，删除 bind() 添加的事件监听器

  }
})
function _duoshuoInit(dom, el){
  if (document.readyState !== 'complete') {
    //此时已经折腾过一次setTimeout,所以再往DOMContentLoaded事件上绑函数已经不起效果了,所以采取了如下的方式.
    setTimeout(_duoshuoInit.bind(null, dom, el), 0)
    return
  }
  try {
    DUOSHUO.EmbedThread(dom)
    el.appendChild(dom)
  } catch (err) {
    setTimeout(_duoshuoInit.bind(null, dom, el), 200)
  }
}
