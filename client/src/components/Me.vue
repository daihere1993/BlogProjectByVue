<template>
    <div>
      <article class="post">
        <p v-html="parseHtml(content)">
        </p>
      </article>
    </div>
</template>
<script>
  import { markdown } from '../filters/index'
  import service from '../services/me/index'
  export default{
    data () {
      return {
        content: ''
      }
    },
    route: {
      data () {
        return service.getAboutMe().then(res => {
          if (res.success) {
            this.content = res.data.content
          }
        }).catch(err => {
          console.log(err)
          alert('获取内容失败')
        })
      }
    },
    methods: {
      parseHtml (html) {
        return markdown(html)
      }
    }
  }
</script>
