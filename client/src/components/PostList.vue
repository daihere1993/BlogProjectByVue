<template>
  <div class="post-list">
    <!--这个div用来避免这个组件成为片段实例-->
    <article class="article" v-for="post in posts">
      <header>
        <h2 class="article-title">
          <router-link :to="{path: 'post/' + post['_id']}">{{post['title']}}</router-link>
        </h2>
      </header>
      <div class="article-info">
        发布于:
        <span class="article-date">{{post['createTime'] | date}}</span>
      </div>
      <p v-html="parseHtml(post['excerpt'])"></p>
      <footer>
        <router-link :to="{path: 'post/' + post['_id']}">阅读全文</router-link>
      </footer>

    </article>
    <div class="guide-links fix">
      <span v-if="curPage > 1">← <a href="javascript:;" @click="prevPage()">上一页</a></span>
      <span class="r" v-if="totalPage && (curPage < totalPage)"><a href="javascript:;" @click="nextPage()">下一页</a> →</span>
    </div>
  </div>

</template>

<style lang="stylus">
  .article
    border-bottom 1px solid #e8e8e8
    padding 0 5% 4%
  .article-info
    color #999
</style>

<script>
  import { markdown } from '../filters/index'
  import Pagination from './common/pagination.vue'
  import service from '../services/postlist/index'
  const limit = 10
  export default {
    name: 'post-list',
    components: {
      Pagination
    },
    data () {
      return {
        posts: [],
        totalPage: 0,
        curPage: 1
      }
    },
    mounted () {
      const self = this
      service.getPostList({page: this.curPage, limit, sort: {'createTime': -1}}).then((res) => {
        if (res.success === true) {
          self.posts = res.data.articles
          self.totalPage = Math.ceil(res.data.total / limit)
        }
      }).catch(err => {
        console.log(err)
        alert('网络错误,请刷新重试')
      })
    },
    methods: {
      parseHtml (html) {
        return markdown(html)
      },
      prevPage () {
        service.getPostList({page: this.curPage - 1, limit, sort: {'createTime': -1}}).then(res => {
          this.curPage --
          if (res.success === true) {
            this.posts = res.data.articles
            this.totalPage = Math.ceil(res.data.total / limit)
          }
        }).catch(err => {
          console.log(err)
          alert('网络错误,请刷新重试')
        })
      },
      nextPage () {
        service.getPostList({page: this.curPage + 1, limit, sort: {'createTime': -1}}).then(res => {
          this.curPage++
          if (res.success === true) {
            this.posts = res.data.articles
            this.totalPage = Math.ceil(res.data.total / limit)
          }
        }).catch(err => {
          console.log(err)
          alert('网络错误,请刷新重试')
        })
      }
    }
  }
</script>
