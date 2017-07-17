<template>
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <div class="ovh">
      <h3 class="page-title">关于我 <button type="button" class="btn btn-save r" style="margin-right: 50px;margin-top:-6px" @click="save">保存</button></h3>
      <editor :content="content" preview-class="markdown-body" @mdEditorInput="onMdEditorInput"></editor>
    </div>
  </div>
</template>
<script>
  import NavAside from '../Common/NavAside.vue'
  import Editor from '../Common/Editor.vue'
  import service from '../../services/me/index'
  export default {
    components: {
      NavAside,
      Editor
    },
    data () {
      return {
        content: ''
      }
    },
    mounted () {
      service.getAboutMe().then(res => {
        if (res.success) {
          this.content = res.data.content
        }
      }).catch(error => {
        if (error) throw error
        window.alert('获取内容失败')
      })
    },
    methods: {
      save () {
        service.modifyAboutMe(this.content).then(res => {
          if (res.success) {
            window.alert('保存成功')
          }
        }).catch(error => {
          if (error) throw error
          window.alert('保存失败')
        })
      },

      onMdEditorInput (content) {
        this.content = content
      }
    }
  }
</script>
