<template>
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <section class="post-list-column">
      <h3 class="page-title">
        <i class="fa fa-file-text"></i> 文章列表  
        <i class="fa fa-plus post-add" @click="createPost"></i>
      </h3>
      <post-list></post-list>
    </section>
    <div class="post-edit">
      <article-editor v-if="currentPostId !== null"></article-editor>
    </div>
  </div>
</template>
<style lang="stylus">
  @import '../../stylus/simplemde.styl'
  @import '../../stylus/_settings.styl'
  .container-with-aside
    margin-left 70px
    height 100%
  .post-list-column
    float left
    border-right 1px solid $border
    height 100%
    width 300px
    font-size 20px
  .post-add
    cursor pointer
    float right
    margin-right 10px
    margin-top 2px
  .page-title
    color $light
    padding 10px 0px 10px 25px
    font-weight 400
    margin 0
    font-size 20px
  .post-edit
    overflow auto
    height 100%
</style>
<script>
  import { mapActions } from 'vuex'
  import NavAside from '../Common/NavAside.vue'
  import ArticleEditor from '../Common/ArticleEditor.vue'
  import PostList from '../Common/PostList.vue'
  export default {
    name: 'posts',
    data () {
      return {}
    },
    created () {
      this.getAllPost()
    },
    components: {
      NavAside,
      ArticleEditor,
      PostList
    },
    methods: {
      ...mapActions([
        'createPost',
        'getAllPost'
      ])
    }
  }
</script>
