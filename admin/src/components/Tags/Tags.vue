<template>
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <section class="post-list-column">
      <h3 class="page-title" style="margin-bottom:0" v-if="null === tagActive">
        <i class="fa fa-tags"></i> 根据标签搜索文章
      </h3>
      <ul class="clearfix reset-list tag-list" v-if="null !== tagActive">
        <li class="tag active">
          <span v-show="!tagActive['editing']">{{tagActive['name']}}</span>
        </li>
      </ul>
      <ul class="clearfix reset-list tag-list" v-show="(tags.length !== 1 || tagActive == null)">
        <li class="tag" v-for="tag in tags"  v-show="tag !== tagActive">
          <span @click="searchTag(tag)" v-show="!tag['editing']">{{tag['name']}}</span>
        </li>
      </ul>
      <post-list></post-list>
    </section>
    <div class="post-edit">
      <article-editor v-if="null !== currentPostId"></article-editor>
    </div>
  </div>
</template>
<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .tag-list
    padding 15px 0
    margin 0 25px
    &+&
      border-top 1px solid $border
    & span
      cursor pointer
</style>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import NavAside from '../Common/NavAside.vue'
  import ArticleEditor from '../Common/ArticleEditor.vue'
  import PostList from '../Common/PostList.vue'
  import service from '../../services/tags/index'
  export default {
    components: {
      NavAside,
      ArticleEditor,
      PostList
    },
    data () {
      return {
        tagActive: null,
        tags: []
      }
    },
    computed: {
      ...mapGetters([
        'currentPostId'
      ])
    },
    mounted () {
      service.getAllTags().then(res => {
        if (res.success) {
          for (let i of res.data) {
            i.newName = ''
            i.editing = false
          }
          this.tags = res.data
          this.getAllPost()
        }
      })
    },
    methods: {
      searchTag (tag) {
        this.tagActive = tag
        this.getAllPost(tag.id)
      },
      modifyTag (tag) {
        tag.newName = tag.name
        tag.editing = true
      },
      saveTag (tag) {
        if (tag.newName === tag.name) {
          tag.editing = false
          return
        } else if (tag.newName === '') {
          tag.editing = false
          return
        } else {
          service.modifyTag(tag.id, tag.newName).then(res => {
            if (res.success) {
              tag.name = tag.newName
              tag.editing = false
            } else {
              window.alert('已有同名标签')
            }
          }).catch((err) => {
            if (err) throw err
            window.alert('网络错误,修改标签失败')
          })
        }
      },
      blurTag () {
        this.tagActive = null
        this.getAllPost()
      },
      ...mapActions([
        'getAllPost'
      ])
    }
  }
</script>
