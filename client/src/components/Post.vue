<template>
  <div>
    <!--这个div用来避免这个组件成为片段实例-->
    <article class="post">
      <header id="header">
        <h1 class="article-title">{{title}}</h1>
      </header>
      <div class="article-info">
        发布于
        <span class="article-date">{{ createTime | date }}</span>
      </div>
      <div class="article-content" v-html="parseHtml(content)"></div>
      <div class="fix" style="margin: 20px 0;">
        <span class="tag" v-for="tag in tags"><a href="" class="tag-link active">{{tag.name}}</a></span>
      </div>
      <!-- 多说评论框 start -->
      <article id="duoshuo-comment" v-duoshuo="duoshuoOption"></article>
      <!-- 多说评论框 end -->
    </article>
    <pagination :next="nextArticle !== null" :next-link="nextArticle?'/posts/'+nextArticle._id:''" :next-word="nextArticle&&nextArticle.title" :prev="prevArticle !== null" :prev-link="prevArticle?'/posts/'+prevArticle._id:''" :prev-word="prevArticle&&prevArticle.title" ></pagination>
  </div>
</template>

<script>
  import { markdown } from '../filters/index'
  import Pagination from './common/pagination.vue'
  import service from '../services/post/index'
  import '../directives/vue-duoshuo'
  export default {
    components: {
      Pagination
    },
    data () {
      return {
        'id': '',
        'title': '',
        'createTime': '',
        'excerpt': '',
        'content': '',
        'lastEditTime': null,
        'tags': [],
        'visits': 0,
        'nextArticle': null,
        'prevArticle': null,
        'duoshuoOption': {}
      }
    },
    methods: {
      parseHtml (html) {
        return markdown(html)
      },
      fetchData () {
        var self = this
        return service.getPost(this.$route.params.postId).then(res => {
          if (res.success === true) {
            if (res.data !== null) {
              res.data.id = res.data._id
              for (var key in self._data) {
                self[key] = res.data[key]
              }
              let duoshuoOption = {
                id: self.id,
                title: self.title
              }
              self.duoshuoOption = duoshuoOption
            } else {
              self.title = '404 not found'
              self.createTime = ''
              self.excerpt = ''
              self.content = ''
              self.lastEditTime = null
              self.tags = []
              self.visits = 0
              self.nextArticle = null
              self.prevArticle = null
            }
          }
        }).catch(err => {
          console.log(err)
          alert('网络错误,请刷新重试')
        })
      }
    },
    created () {
      this.fetchData()
    }
  }
</script>

<style lang="stylus">
  @import "../stylus/_settings.styl"

  .tag
    float left
    margin-bottom 5px
    a.tag-link
      color $light
      border-bottom 2px solid $light
      &:hover
        color $green
        border-bottom 2px solid $green
      &.active
        color $green
        border-bottom 2px solid $green
    &+&
      margin-left 20px
  @media screen and (max-width: 720px)
    .tag
      margin: 0 5px 5px;
      &+&
        margin-left 5px
  .article-content
    margin 4em 0 1em
</style>
