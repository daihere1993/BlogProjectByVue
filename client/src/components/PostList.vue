<template>
  <div class="post-list">
    <!--这个div用来避免这个组件成为片段实例-->
    <article class="article" v-for="post in posts">
      <header>
        <h2 class="article-title"><a v-link="'/posts/'+post['_id']">{{post['title']}}</a></h2>
      </header>
      <div class="article-info">
        发布于:
        <span class="article-date">{{post['createTime'] | date}}</span>
      </div>
      <p v-html="post['excerpt'] | markdown"></p>
      <footer>
        <a v-link="'/posts/'+post['_id']">阅读全文</a>
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
  import Pagination from './common/Pagination.vue'
  import service from '../services/postlist/index'
  const limit = 10
  export default {
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
    ready () {
      service.getPostList({page: this.curPage, limit}).then((res) => {
        if (res.success === true) {
          this.posts = res.data.articles
          // 后台返回的时间为UTC格式的时间，得转化成本地时间
          this.posts.forEach((post) => {
            post.createTime = new Date(post.createTime)
          })
          this.posts.sort((post1, post2) => { return post2.createTime - post1.createTime })
          this.totalPage = Math.ceil(res.data.total / limit)
        }
      }).catch(err => {
        console.log(err)
        alert('网络错误,请刷新重试')
      })
    },
    methods: {
      prevPage () {
        service.getPostList({page: this.curPage - 1, limit}).then(res => {
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
        service.getPostList({page: this.curPage + 1, limit}).then(res => {
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
