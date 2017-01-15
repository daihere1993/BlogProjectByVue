<template>
  <div class="post-list">
    <section>
      <h2>
        All Tags
      </h2>
      <p class="fix tag-container">
        <span class="tag" v-for="tag in tags"><a href="javascript:;" @click="focus(tag['id'])">{{tag['name']}}</a></span>
      </p>
    </section>
    <section v-for="item in tagAndItsArticles" :id="item['id']">
      <h3>
        {{item['name']}}
      </h3>
      <ul>
        <li v-for="article in item['articles']">
          <h4>
            <router-link to="'/posts/'+article['id']">
              {{article['title']}}
            </router-link> 
            <span>{{article['createTime']}}</span>
          </h4>
        </li>
      </ul>
    </section>
  </div>
</template>
<style lang="stylus">
  .tag-container
    font-size 1.2em
</style>
<script>
  import service from '../services/tag/index'
  export default{
    data () {
      return {
        tagAndItsArticles: [],
        tags: []
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.tags = []
        this.tagAndItsArticles = []
        service.getAllTags().then(res => {
          if (res.success) {
            res.data.map(tag => {
              service.getPostListWithTag(tag.id).then(resp => {
                if (resp.success) {
                  if (resp.data.articles.length) {
                    tag.articles = resp.data.articles
                    this.tags.push({name: tag.name, id: tag.id})
                    this.tagAndItsArticles.push(tag)
                  }
                }
              })
            })
          }
        })
      },
      focus (id) {
        let dom = document.getElementById(id)
        window.scrollTo(0, dom.offsetTop)
      }
    }
  }
</script>
